DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS activities;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password VARCHAR
);

CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  username TEXT,
  date DATE NOT NULL,
  completed BOOLEAN
);
--psql -d fitness -u cyeap -f tables.sql