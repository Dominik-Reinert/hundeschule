create table auth_token(
    person_id integer not null,
    token text not null,
    last_used date default now(),
    foreign key (person_id) references person (id)
);