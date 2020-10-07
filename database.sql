create user lofigirl@localhost;
create schema lofigirl;
grant all privileges on lofigirl.* to lofigirl@localhost;

use lofigirl;
create table channels (
  id varchar(20) not null,
  guild varchar(20) not null
);
