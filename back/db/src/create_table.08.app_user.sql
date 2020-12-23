create table app_user(
    person_id integer not null,
    password text not null,
    is_admin boolean default false,
    foreign key (person_id) references person (id)
);