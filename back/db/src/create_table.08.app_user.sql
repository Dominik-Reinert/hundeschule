create table app_user(
    person_id integer not null,
    password text not null,
    foreign key (person_id) references person (id)
);