import { createPoolQuery } from "../../db/src/run_on_pool";
import { Entity } from "./entity";

export interface AppUser {
  id?: never;
  personId: number;
  isAdmin: boolean;
  passwordHash: string;
}

export interface DatabaseAppUser
  extends Omit<AppUser, "personId" | "isAdmin" | "passwordHash"> {
  person_id: number;
  is_admin: string;
  password: string;
}

function adaptDatabaseAppUser(dbAppUsers: DatabaseAppUser[]): AppUser[] {
  return dbAppUsers.map((dbAppUser) => {
    const { person_id, password, is_admin, ...appuser } = dbAppUser;
    return {
      ...appuser,
      personId: person_id,
      passwordHash: password,
      isAdmin: is_admin === "t",
    };
  });
}

function adaptAppUserToDatabase(appusers: AppUser[]): DatabaseAppUser[] {
  return appusers.map((appuser) => {
    const { personId, isAdmin, passwordHash, ...dbAppUser } = appuser;
    return {
      ...dbAppUser,
      person_id: personId,
      password: passwordHash,
      is_admin: isAdmin ? "t" : "f",
    };
  });
}

export class AppUserEntity implements Entity<AppUser> {
  private readonly tableName: string = "appuser";

  public async findAll(): Promise<AppUser[]> {
    return adaptDatabaseAppUser(
      await createPoolQuery<DatabaseAppUser[]>(async (client) => {
        return (
          await client.query<DatabaseAppUser>(`select * from ${this.tableName}`)
        ).rows;
      })
    );
  }

  public async find(id: number): Promise<AppUser> {
    return adaptDatabaseAppUser([
      await createPoolQuery<DatabaseAppUser>(async (client) => {
        return (
          await client.query<DatabaseAppUser>(
            `select * from ${this.tableName} where id = ${id}`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async exists(id: number): Promise<boolean> {
    return createPoolQuery<boolean>(async (client) => {
      return (
        (
          await client.query(
            `select * from ${this.tableName} where person_id = ${id}`
          )
        ).rowCount === 1
      );
    });
  }

  public async insert(appuser: AppUser): Promise<undefined> {
    await createPoolQuery<void>(async (client) => {
      const { id, ...idLessAppUser } = adaptAppUserToDatabase([appuser])[0];
      await client.query(
        `insert into ${
          this.tableName
        } (dvg_id, name, vorname, addresse, email) values (${Object.values(
          idLessAppUser
        ).join(", ")})`
      );
    });
    return;
  }

  public getTablename(): string {
    return this.tableName;
  }
}
