create table verein(
    id serial primary key,
    kreisverband_id integer not null,
    vorsitzender_id integer not null,
    name text,
    foreign key (kreisverband_id) references kreisverband (id),
    foreign key (vorsitzender_id) references person (id)
);