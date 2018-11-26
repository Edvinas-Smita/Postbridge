--create database parcelsapp;

drop table if exists parcel_status_history;
drop table if exists parcels;
drop table if exists users;
drop table if exists locations;

CREATE EXTENSION pgcrypto;

create table users (
  id bigserial not null,
  first_name character varying(256) not null,
  last_name character varying(256) not null,
  email character varying(256) not null,
  salt character varying(64) not null,
  hash character varying(128) not null,
  primary key (id)
);

create table locations (
  id bigserial not null,
  name character varying(256) not null,
  primary key (id),
  constraint locations_uk unique (name)
);

create table parcels (
  id bigserial not null,
  date_created timestamp not null,
  ref_user_recipient bigint not null,
  ref_user_courier bigint,
  status smallint not null,
  description character varying(256) not null,
  weight int not null,
  ref_location_start bigint not null,
  ref_location_end bigint not null,
  primary key (id),
  constraint parcels_users_recipient_fk foreign key (ref_user_recipient)
    references users (id) match simple
      on update restrict
      on delete restrict,
  constraint parcels_users_courier_fk foreign key (ref_user_courier)
    references users (id) match simple
      on update restrict
      on delete restrict,
  constraint parcels_locations_start_fk foreign key (ref_location_start)
    references locations (id) match simple
      on update restrict
      on delete restrict,
  constraint parcels_locations_end_fk foreign key (ref_location_end)
    references locations (id) match simple
      on update restrict
      on delete restrict
);

create table parcel_status_history (
  id bigserial not null,
  ref_parcel bigint not null,
  status smallint not null,
  date_changed timestamp not null,
  ref_user bigint not null,
  primary key (id),
  constraint parcel_status_history_parcels_fk foreign key (ref_parcel)
    references parcels (id) match simple
      on update cascade
      on delete cascade,
  constraint parcel_status_history_users_fk foreign key (ref_user)
    references users (id) match simple
      on update restrict
      on delete restrict
);