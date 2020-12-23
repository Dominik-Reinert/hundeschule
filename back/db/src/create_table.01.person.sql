create table person(
    id serial primary key,
    dvg_id integer unique,
    name text not null,
    vorname text not null,
    adresse text,
    email text unique
);