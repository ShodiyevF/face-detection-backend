create database faceid;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop table if exists branches cascade;
create table branches(
    branch_id uuid DEFAULT uuid_generate_v4 () primary key,
    branch_name varchar(30) not null,
    branch_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

drop table if exists userrole cascade;
create table userrole(
    role_id uuid DEFAULT uuid_generate_v4 () primary key,
    role_name varchar(25) not null,
    role_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

drop table if exists users cascade;
create table users(
    user_id uuid DEFAULT uuid_generate_v4 () primary key,
    user_firstname varchar(30) not null,
    user_lastname varchar(30) not null,
    user_img varchar(64) not null,
    user_email varchar(64) unique,
    user_password varchar(64),
    role_id uuid not null references userrole(role_id),
    branch_id uuid not null references branches(branch_id),
    user_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

drop table if exists allowedbranch cascade;
create table allowedbranch(
    allowedbranch_id uuid DEFAULT uuid_generate_v4 () primary key,
    branch_id uuid not null references branches(branch_id),
    user_id uuid not null references users(user_id)
);

drop table if exists controllers cascade;
create table controllers(
    controller_id uuid DEFAULT uuid_generate_v4 () primary key,
    controller_name varchar(30) not null,
    controller_url text not null,
    branch_id uuid not null references branches(branch_id),
    user_createdat TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);