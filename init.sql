DROP DATABASE IF EXISTS scrap_db; 

-- Create database
CREATE DATABASE scrap_db;

-- Connect to the newly created database
\c scrap_db;

-- Create first table
CREATE TABLE insertions_rent (
  id SERIAL PRIMARY KEY,
  img VARCHAR,
  price VARCHAR,
  title VARCHAR,
  location VARCHAR
);

-- Create first table
CREATE TABLE insertions_sell (
  id SERIAL PRIMARY KEY,
  img VARCHAR,
  price VARCHAR,
  title VARCHAR,
  location VARCHAR
);

-- -- Insert sample data
-- INSERT INTO mytable (name) VALUES ('John');
-- INSERT INTO mytable (name) VALUES ('Jane');