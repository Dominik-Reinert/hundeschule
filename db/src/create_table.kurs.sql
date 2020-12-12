create table kurs(
    id serial primary key,
    leiter_id integer not null,
    beginn date not null,
    foreign key (leiter_id) references kurs (id)
);