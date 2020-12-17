create table person(
    id serial primary key,
    dvg_id integer unique not null,
    name text,
    vorname text,
    adresse text,
    email text unique
);