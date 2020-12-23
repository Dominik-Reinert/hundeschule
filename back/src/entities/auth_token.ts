import { createPoolQuery } from "../../db/src/run_on_pool";
import { Entity } from "./entity";

export interface AuthToken {
  personId: number;
  token: string;
  id?: never;
  lastUsed?: number;
}

interface DatabaseAuthToken extends Omit<AuthToken, "personId" | "lastUsed"> {
  person_id: number;
  last_used?: number;
}

function adaptDatabaseAuthToken(
  dbAuthTokene: DatabaseAuthToken[]
): AuthToken[] {
  return dbAuthTokene.map((dbAuthToken) => {
    const { person_id, last_used, ...authtoken } = dbAuthToken;
    return {
      ...authtoken,
      personId: person_id,
      lastUsed: last_used,
    };
  });
}

function adaptAuthTokenToDatabase(
  authtokene: AuthToken[]
): DatabaseAuthToken[] {
  return authtokene.map((authtoken) => {
    const { personId, lastUsed, ...dbAuthToken } = authtoken;
    return {
      ...dbAuthToken,
      person_id: personId,
      last_used: lastUsed,
    };
  });
}

export class AuthTokenEntity implements Entity<AuthToken> {
  private readonly tableName: string = "auth_token";

  public async findAll(): Promise<AuthToken[]> {
    return adaptDatabaseAuthToken(
      await createPoolQuery<DatabaseAuthToken[]>(async (client) => {
        return (
          await client.query<DatabaseAuthToken>(
            `select * from ${this.tableName}`
          )
        ).rows;
      })
    );
  }

  public async find(personId: number): Promise<AuthToken> {
    return adaptDatabaseAuthToken([
      await createPoolQuery<DatabaseAuthToken>(async (client) => {
        return (
          await client.query<DatabaseAuthToken>(
            `select * from ${this.tableName} where person_id = ${personId}`
          )
        ).rows[0];
      }),
    ])[0];
  }

  public async insert(authToken: AuthToken): Promise<undefined> {
    return createPoolQuery<undefined>(async (client) => {
      const { id, ...idLessAuthToken } = adaptAuthTokenToDatabase([
        authToken,
      ])[0];
      await client.query(
        `insert into ${this.tableName} (person_id, token) values (${idLessAuthToken.person_id}, ${idLessAuthToken.token})`
      );
      return undefined;
    });
  }

  public getTablename(): string {
    return this.tableName;
  }
}
