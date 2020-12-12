create table kurs_teilnehmer(
    kurs_id integer not null,
    teilnehmer_id integer not null,
    primary key (kurs_id, teilnehmer_id),
    foreign key (kurs_id) references kurs (id),
    foreign key (teilnehmer_id) references person (id)
);