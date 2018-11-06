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

insert into parcels values (nextval('parcels_id_seq'), current_timestamp, 1, 4, 3, 'Books', 1500,
  (select id from locations where name = 'Vilnius'),
  (select id from locations where name = 'Toronto'));
insert into parcels values (nextval('parcels_id_seq'), current_timestamp, 2, 1, 1, 'Laptop', 3000,
  (select id from locations where name = 'Kaunas'),
  (select id from locations where name = 'Vilnius'));
insert into parcels values (nextval('parcels_id_seq'), current_timestamp, 3, 1, 1, 'Laptop', 3000,
  (select id from locations where name = 'Chicago'),
  (select id from locations where name = 'Vilnius'));
insert into parcels values (nextval('parcels_id_seq'), current_timestamp, 8, 3, 2, 'Electronic Goods', 3000,
  (select id from locations where name = 'Vilnius'),
  (select id from locations where name = 'London'));
insert into parcels values (nextval('parcels_id_seq'), current_timestamp, 6, 7, 4, 'Home appliances', 2850,
  (select id from locations where name = 'Chicago'),
  (select id from locations where name = 'Kaunas'));
insert into parcels values (nextval('parcels_id_seq'), current_timestamp, 9, 15, 3, 'Electronic Goods', 500,
  (select id from locations where name = 'Vilnius'),
  (select id from locations where name = 'Kaunas'));
insert into parcels values (nextval('parcels_id_seq'), current_timestamp, 18, 13, 2, 'Electronic Goods', 2980,
  (select id from locations where name = 'Vilnius'),
  (select id from locations where name = 'London'));