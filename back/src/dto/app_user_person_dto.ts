import { createPoolQuery } from "../../db/src/run_on_pool";
import { AppUser, AppUserEntity, DatabaseAppUser } from "../entities/app_user";
import { DatabasePerson, Person, PersonEntity } from "../entities/person";

export interface AppUserPerson
  extends Person,
    Omit<AppUser, "id" | "personId"> {}

interface DatabaseAppUserPerson
  extends DatabasePerson,
    Omit<DatabaseAppUser, "id" | "person_id"> {}

function adaptDatabaseAppUserPersonDto(
  dbAppUserPersonDto: DatabaseAppUserPerson[]
): AppUserPerson[] {
  return dbAppUserPersonDto
    .filter((e) => e)
    .map((dbAppUserPersonDto) => {
      const {
        dvg_id,
        is_admin,
        password,
        ...appUserPersonDto
      } = dbAppUserPersonDto;
      return {
        ...appUserPersonDto,
        dvgId: dvg_id,
        isAdmin: is_admin === "t",
        passwordHash: password,
      };
    });
}

export class AppUserPersonDto {
  public async findAll(): Promise<AppUserPerson[]> {
    return adaptDatabaseAppUserPersonDto(
      await createPoolQuery<DatabaseAppUserPerson[]>(async (client) => {
        const appUserTableName = new AppUserEntity().getTablename();
        const personTableName = new PersonEntity().getTablename();

        return (
          await client.query<DatabaseAppUserPerson>(
            `select * from ${appUserTableName} join ${personTableName} on ${appUserTableName}.person_id=${personTableName}.id;`
          )
        ).rows;
      })
    );
  }

  public async findByEmail(email: string): Promise<AppUserPerson> {
    return adaptDatabaseAppUserPersonDto([
      await createPoolQuery<DatabaseAppUserPerson>(async (client) => {
        const appUserTableName = new AppUserEntity().getTablename();
        const personTableName = new PersonEntity().getTablename();

        return (
          await client.query<DatabaseAppUserPerson>(
            `select * from ${appUserTableName} 
              join ${personTableName} on ${appUserTableName}.person_id=${personTableName}.id 
              where exists (
                select * from ${personTableName} p where p.email = '${email}'
              );`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(appUserToPersonDto: AppUserPerson): Promise<void> {
    let id = appUserToPersonDto.id ?? -1;
    const {
      addresse,
      dvgId,
      email,
      isAdmin,
      name,
      passwordHash,
      vorname,
    } = appUserToPersonDto;
    const personEntity = new PersonEntity();
    const appUserEntity = new AppUserEntity();

    const personExists: boolean = await personEntity.exists(id);
    const appUserExists: boolean = await appUserEntity.exists(id);

    if (id === -1 && !personExists) {
      await personEntity.insert({
        id,
        name,
        vorname,
        dvgId,
        addresse,
        email,
      });
    }

    if (!appUserExists) {
      await appUserEntity.insert({ isAdmin, passwordHash, personId: id });
    }
  }
}
