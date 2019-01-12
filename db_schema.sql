drop database if exists chat_app_db;

create database chat_app_db;
use chat_app_db;
create table users (
  user_id int primary key auto_increment,
  username varchar(255) not null unique ,
  email varchar(255) not null unique,
  password varchar(255) not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  sex char(1) not null,
  dob timestamp not null
  );

create table messages (
  sent_by int not null,
  received_by int not null,
  sent_at timestamp not null default now(),
  content text not null ,
  foreign key (sent_by) references users(user_id),
  foreign key (received_by) references users(user_id)
                      );