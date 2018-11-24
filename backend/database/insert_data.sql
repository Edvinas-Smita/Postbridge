delete from parcel_status_history;
delete from parcels;
delete from users;
delete from locations;

insert into users values (1, 'Johna', 'Bill');
insert into users values (2, 'Saulius', 'Virnys');
insert into users values (3, 'Kol', 'Bum');
insert into users values (4, 'Osvaldas', 'Kisielius');
insert into users values (6, 'Vytautas', 'Stankevičius');
insert into users values (7, 'Mat', 'Cox');
insert into users values (8, 'John', 'Wick');
insert into users values (9, 'Lindsay', 'Smith');
insert into users values (13, 'Monica', 'Wilde');
insert into users values (15, 'Caroline', 'Jaymes');
insert into users values (18, 'Patrick', 'Strongwell');

select setval('users_id_seq', coalesce((select max(id) + 1 FROM users), 1), false);

insert into locations (name) values ('Vilnius');
insert into locations (name) values ('Kaunas');
insert into locations (name) values ('Toronto');
insert into locations (name) values ('Chicago');
insert into locations (name) values ('London');

do $$
  declare ref_parcel integer;
begin
  insert into parcels values (nextval('parcels_id_seq'),
    to_timestamp('2018-03-28 23:15:30', 'YYYY-MM-DD HH24:MI:SS'),
    1, 4, 3, 'Books', 1500,
    (select id from locations where name = 'Vilnius'),
    (select id from locations where name = 'Toronto')) returning id into ref_parcel;
  insert into parcel_status_history values (nextval('parcel_status_history_id_seq'),
    ref_parcel, 1, to_timestamp('2018-03-28 23:15:30', 'YYYY-MM-DD HH24:MI:SS'), 1);
  insert into parcel_status_history values (nextval('parcel_status_history_id_seq'),
    ref_parcel, 2, to_timestamp('2018-04-15 10:12:05', 'YYYY-MM-DD HH24:MI:SS'), 18);
  insert into parcel_status_history values (nextval('parcel_status_history_id_seq'),
    ref_parcel, 3, to_timestamp('2018-04-17 12:35:13', 'YYYY-MM-DD HH24:MI:SS'), 18);
end $$;

do $$
  declare ref_parcel integer;
begin
  insert into parcels values (nextval('parcels_id_seq'),
    to_timestamp('2018-05-13 06:14:12', 'YYYY-MM-DD HH24:MI:SS'),
    2, 1, 1, 'Laptop', 3000,
    (select id from locations where name = 'Kaunas'),
    (select id from locations where name = 'Vilnius')) returning id into ref_parcel;
  insert into parcel_status_history values (nextval('parcel_status_history_id_seq'),
    ref_parcel, 1, to_timestamp('2018-05-13 06:14:12', 'YYYY-MM-DD HH24:MI:SS'), 2);
end $$;

insert into parcels values (nextval('parcels_id_seq'),
  to_timestamp('2018-07-14 09:37:14', 'YYYY-MM-DD HH24:MI:SS'),
  3, 1, 1, 'Laptop', 3000,
  (select id from locations where name = 'Chicago'),
  (select id from locations where name = 'Vilnius'));

do $$
  declare ref_parcel integer;
begin
  insert into parcels values (nextval('parcels_id_seq'),
    to_timestamp('2018-06-10 08:01:49', 'YYYY-MM-DD HH24:MI:SS'),
    8, 3, 2, 'Electronic Goods', 3000,
    (select id from locations where name = 'Vilnius'),
    (select id from locations where name = 'London')) returning id into ref_parcel;
  insert into parcel_status_history values (nextval('parcel_status_history_id_seq'),
    ref_parcel, 1, to_timestamp('2018-06-10 08:01:49', 'YYYY-MM-DD HH24:MI:SS'), 8);
  insert into parcel_status_history values (nextval('parcel_status_history_id_seq'),
    ref_parcel, 2, to_timestamp('2018-06-12 14:45:01', 'YYYY-MM-DD HH24:MI:SS'), 15);
end $$;

insert into parcels values (nextval('parcels_id_seq'),
  to_timestamp('2018-07-01 12:13:20', 'YYYY-MM-DD HH24:MI:SS'),
  6, 7, 4, 'Home appliances', 2850,
  (select id from locations where name = 'Chicago'),
  (select id from locations where name = 'Kaunas'));
insert into parcels values (nextval('parcels_id_seq'),
  to_timestamp('2018-08-25 10:20:04', 'YYYY-MM-DD HH24:MI:SS'),
  9, 15, 3, 'Electronic Goods', 500,
  (select id from locations where name = 'Vilnius'),
  (select id from locations where name = 'Kaunas'));
insert into parcels values (nextval('parcels_id_seq'),
  to_timestamp('2018-06-15 21:01:03', 'YYYY-MM-DD HH24:MI:SS'),
  18, 13, 2, 'Electronic Goods', 2980,
  (select id from locations where name = 'Vilnius'),
  (select id from locations where name = 'London'));