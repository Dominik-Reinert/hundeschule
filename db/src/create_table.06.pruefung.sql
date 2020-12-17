create table pruefung(
    id serial primary key,
    pruefer_id integer not null,
    kurs_id integer not null,
    date date not null,
    foreign key (pruefer_id) references person (id),
    foreign key (kurs_id) references kurs (id)
);