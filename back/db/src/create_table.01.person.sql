create table person(
    id serial primary key,
    name text not null,
    vorname text not null,
    email text unique not null,
    dvg_id integer unique,
    adresse text
);