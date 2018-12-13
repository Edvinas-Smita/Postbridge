delete from parcel_status_history;
delete from parcels;
delete from users;
delete from locations;

INSERT INTO users(id, first_name, last_name, email, salt, hash, image) --Passwords are '{first_name}Password123' --All images are in this album https://imgur.com/a/pWXHCeD
VALUES
  (1, 'Homer',	'Simpson',	'homer@the.simpsons',	'$2a$06$rGm395JtzvBqNLdg0wyph.',	'$2a$06$rGm395JtzvBqNLdg0wyph.klr4EpUck5pbe3CPRzLpd6YRHraWCre', 'https://i.imgur.com/u9ZgCtO.jpg'),
  (2, 'Marge',	'Simpson',	'marge@the.simpsons',	'$2a$06$mtKNtIEkKxRLFwUWdt8qv.',	'$2a$06$mtKNtIEkKxRLFwUWdt8qv.Ik1uFilnRFVPFLJ8TiaRHZLx.5vK6kC', 'https://i.imgur.com/v3rMOOV.jpg'),
  (3, 'Bart',	'Simpson',	'bart@the.simpsons',	'$2a$06$0AGeyxAuLdJK3GL34WkB6u',	'$2a$06$0AGeyxAuLdJK3GL34WkB6uSLIk.SR5eBb/IVcVG3k9NRZkF19hmAC', 'https://i.imgur.com/GxE05Qw.png'),
  (4, 'Lisa',	'Simpson',	'lisa@the.simpsons',	'$2a$06$jZlO1Jt0KiVnW3BsHMvu2.',	'$2a$06$jZlO1Jt0KiVnW3BsHMvu2.0c5Z3MsjgSbpX53DGi86o3QhqwEUFFm', 'https://i.imgur.com/w6Ss90H.png'),
  (5, 'Maggie',	'Simpson',	'maggie@the.simpsons',	'$2a$06$QJpl5AIlXPn2MAii5Aw6fe',	'$2a$06$QJpl5AIlXPn2MAii5Aw6febeJ73Ow6REcI.2Graz1aB7z.Feyb5C.', 'https://i.imgur.com/PP89qT6.png'),
  (6, 'Abraham',	'Simpson',	'abraham@the.simpsons',	'$2a$06$SCm86cfKHLlBwLiwAHX5v.',	'$2a$06$SCm86cfKHLlBwLiwAHX5v.QUhPcrGSiavbeM0t1nYzhRgMBnko4dS', 'https://i.imgur.com/4iaDZPr.png'),
  (7, 'Patty',	'Bouvier',	'patty@the.simpsons',	'$2a$06$D2wTMcC5.JOf8fQc12Tl4e',	'$2a$06$D2wTMcC5.JOf8fQc12Tl4eRo56n9P3Hf6FSP.q5JAo/e.cnXpbtJy', 'https://i.imgur.com/lSmT69c.png'),
  (8, 'Selma',	'Bouvier',	'selma@the.simpsons',	'$2a$06$IL2XK5Bqrqah23LA8Tfy5u',	'$2a$06$IL2XK5Bqrqah23LA8Tfy5u4sKKLpNZXe4MZV7lj.ChvxQH.JfcJ5i', 'https://i.imgur.com/quhHZ1p.jpg'),
  (9, 'Millhouse',	'Mussolini Van Houten',	'millhouse@the.simpsons',	'$2a$06$x32W5oNrjx7BEoH51w21mO',	'$2a$06$x32W5oNrjx7BEoH51w21mOTva2klovmfSuihgI8pYJyI0.9F0x8JG', 'https://i.imgur.com/XawmdZF.png'),
  (10, 'Ralph',	'Wiggum',	'ralph@the.simpsons',	'$2a$06$Y87NUQc0qbzxjF.y22vF6O',	'$2a$06$Y87NUQc0qbzxjF.y22vF6Omms8GWucod/k6MoyVC3t3NUSjL.HEUW', 'https://i.imgur.com/Hb4vsnM.png'),
  (11, 'Nelson',	'Muntz',	'nelson@the.simpsons',	'$2a$06$0bdAmYpDOedCiRNE4.qt0O',	'$2a$06$0bdAmYpDOedCiRNE4.qt0ONOTUOpeVPE./nJI0Yklt8qYhyWmVwX6', 'https://i.imgur.com/Mi4wPyF.png'),
  (12, 'Moe',	'Szyslak',	'moe@the.simpsons',	'$2a$06$7lwgJslV6v6TLHPg6G9RSO',	'$2a$06$7lwgJslV6v6TLHPg6G9RSOpWnDBHGgrSbSkNRbU3lS6N4a3Is8Uxa', 'https://i.imgur.com/iZySE5g.jpg'),
  (13, 'Ned',	'Flanders',	'ned@the.simpsons',	'$2a$06$I8jzTpl32Hcidxey7SEqQO',	'$2a$06$I8jzTpl32Hcidxey7SEqQO4LhWyS/4RG9CPanfnQj3Fi00CAwGj1S', 'https://i.imgur.com/zBxCYjq.jpg'),
  (14, 'Principal',	'Skinner',	'principal@the.simpsons',	'$2a$06$miRio0E69AIFU.T2n9rNKu',	'$2a$06$miRio0E69AIFU.T2n9rNKuY1.3sw3s8UiNPYWe4H.1nMiRQ7UTkHe', 'https://i.imgur.com/091gMtG.png'),
  (15, 'Charles',	'Montgomery Burns',	'charles@the.simpsons',	'$2a$06$4TZYItjHnG/D30TKZvH1ju',	'$2a$06$4TZYItjHnG/D30TKZvH1jumx6f7RctFTp34bWMkE86CFDK2ijWy0K', 'https://i.imgur.com/9z2baUa.jpg'),
  (16, 'Waylon',	'Smithers',	'waylon@the.simpsons',	'$2a$06$Q/Qk7cYguUCJ32QVnPKuku',	'$2a$06$Q/Qk7cYguUCJ32QVnPKukuCAhgdvW2yf76KyldhewrCOeWwwxJx1.', 'https://i.imgur.com/m4Bbiho.jpg');

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
    ref_parcel, 2, to_timestamp('2018-04-15 10:12:05', 'YYYY-MM-DD HH24:MI:SS'), 14);
  insert into parcel_status_history values (nextval('parcel_status_history_id_seq'),
    ref_parcel, 3, to_timestamp('2018-04-17 12:35:13', 'YYYY-MM-DD HH24:MI:SS'), 14);
end $$;

do $$
  declare ref_parcel integer;
begin
  insert into parcels values (nextval('parcels_id_seq'),
    to_timestamp('2018-05-13 06:14:12', 'YYYY-MM-DD HH24:MI:SS'),
    2, null, 1, 'Laptop', 3000,
    (select id from locations where name = 'Kaunas'),
    (select id from locations where name = 'Vilnius')) returning id into ref_parcel;
  insert into parcel_status_history values (nextval('parcel_status_history_id_seq'),
    ref_parcel, 1, to_timestamp('2018-05-13 06:14:12', 'YYYY-MM-DD HH24:MI:SS'), 2);
end $$;

insert into parcels values (nextval('parcels_id_seq'),
  to_timestamp('2018-07-14 09:37:14', 'YYYY-MM-DD HH24:MI:SS'),
  3, null, 1, 'Laptop', 3000,
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
  14, 13, 2, 'Electronic Goods', 2980,
  (select id from locations where name = 'Vilnius'),
  (select id from locations where name = 'London'));