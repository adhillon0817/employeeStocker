const express= ('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
        {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'listofemployees_db'
        }
)














// View all departments 

// SELECT * FROM department 

/////////////////////////////////////////////////////

// View all roles

// SELECT * FROM role

/////////////////////////////////////////////////////

// View all employees 

// SELECT * FROM employee;

/////////////////////////////////////////////////////

// Create a new department

//Prompt the user for the "name" of the department

        // THEN run the query
        // INSERT INTO department (name)
        // VALUES ("Sales");

            // THEN ask the user what they want to do next

/////////////////////////////////////////////////////

//Create a new role



// Get the existing departments from the 'departement' table

    // THEN prompt the user for the "title", "salary", and "department" for the role

            // THEN run the query
            // INSERT INTO role (title, salary, department_id)
            //  VALUES ("anyrole", 120000, 1)


                    //THEN ask the user waht they want to do next