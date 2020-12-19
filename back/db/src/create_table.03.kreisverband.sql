create table kreisverband(
    id serial primary key,
    landesverband_id integer not null,
    name text,
    foreign key (landesverband_id) references landesverband (id)
);