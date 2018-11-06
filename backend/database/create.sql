create database parcelsapp;

create table users (
  id bigserial not null,
  first_name character varying(256) not null,
  last_name character varying(256) not null,
  primary key (id));
  
create table locations (
  id bigserial not null,
  name character varying(256) not null,
  primary key (id)
);
create unique index locations_uk on locations;

create table parcels (
  id bigserial not null,
  date_created timestamp not null,
  ref_user_reciever bigserial not null,
  ref_user_courier bigserial,
  status smallint not null,
  description character varying(256) not null,
  weight smallint not null,
  ref_location_start bigserial not null,
  ref_location_end bigserial not null,
  primary key (id),
  constraint parcels_users_reciever_fk foreign key (ref_user_reciever)
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