import { createPoolQuery } from "../../db/src/run_on_pool";

export type AppUserPerson = any;

export type DatabaseAppUserPerson = any;

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
        const personTableName = "person"; //new PersonEntity().getTablename();

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
        const personTableName = "person"; // new PersonEntity().getTablename();

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
    const personEntity = undefined as any;
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
