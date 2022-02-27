CREATE TABLE Product(
    Product_ID uuid not null unique primary key ,
    Product_Name text not null
);

CREATE TABLE Product_Safety (
    Product_ID uuid not null unique primary key ,
    temperature text not null,
    Expiration_Date date not null,
    recall boolean default false
);

CREATE TABLE Users (
    User_ID uuid not null unique primary key,
    User_Type text not null,
    Username text not null,
    Password text not null,
    location text not null
);


CREATE TABLE Scan (
    Product_ID uuid not null unique primary key,
    User_ID text not null,
    Location text not null,
    Date date not null,
    time time not null,
    distributor text not null
);