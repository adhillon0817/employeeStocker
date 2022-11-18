DROP DATABASE IF EXISTS listofemployees_db;
CREATE DATABASE listofemployees_db;
USE listofemployees_db;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name_department VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id),
    PRIMARY KEY (id)
);