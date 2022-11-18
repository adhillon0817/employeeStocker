USE listofemployees_db;

INSERT INTO department (name_department)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Sales","120000",1),("Salesperson","80000",1),("Lead Engineer","150000",2),("Software Engineer","100000",2),("Account Manager","160000",3),("Accountant", "125000",3),("Legal Team Lead", "250000",4),("Lawyer","180000",4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('John', 'Doe', 1),('Mike', 'Chan', 2),('Ashley', 'Rodriguez', 3),('Kevin', 'Tupik', 4),('Kunal', 'Singh', 5),('Malia', 'Brown', 6),('Sarah', 'Lourd', 7),('Tom', 'Allen', 8);