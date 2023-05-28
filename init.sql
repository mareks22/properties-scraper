
-- Connect to the newly created database
\connect scrap_db;

-- Create first table
CREATE TABLE insertions_rent (
  id SERIAL PRIMARY KEY,
  img VARCHAR,
  price VARCHAR,
  title VARCHAR,
  location VARCHAR,
  url VARCHAR
);

-- Create first table
CREATE TABLE insertions_sell (
  id SERIAL PRIMARY KEY,
  img VARCHAR,
  price VARCHAR,
  title VARCHAR,
  location VARCHAR,
  url VARCHAR
);

-- -- Insert sample data
-- INSERT INTO mytable (name) VALUES ('John');
-- INSERT INTO mytable (name) VALUES ('Jane');