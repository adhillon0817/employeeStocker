DROP DATABASE IF EXISTS listofemployee_db;
CREATE DATABASE listofemployee_db;
USE listofemployee_db;

CREATE TABLE department (
    id: INT NOT NULL,
    name VARCHAR (30),
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,

    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department_id
    ON DELETE SET NULL

);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES (id)
    ON DELETE SET NULL
);