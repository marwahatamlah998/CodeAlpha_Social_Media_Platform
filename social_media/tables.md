/*
In Neon, databases are stored on branches. By default, a project has one branch and one database.
You can select the branch and database to use from the drop-down menus above.

Try generating sample data and querying it by running the example statements below, or click
New Query to clear the editor.
*/

CREATE TABLE roles (
  id SERIAL NOT NULL,
  PRIMARY KEY(id),
  role_name VARCHAR(255) NOT NULL UNIQUE
)

CREATE TABLE users (
 id SERIAL NOT NULL,
 PRIMARY KEY(id),
  firstName VARCHAR(255) NOT NULL ,
  lastName VARCHAR(255) NOT NULL ,
  age INT NOT NULL ,
  country VARCHAR(255) NOT NULL , 
  phoneNumber INT NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL ,
  FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
   is_deleted BOOLEAN  DEFAULT FALSE
);