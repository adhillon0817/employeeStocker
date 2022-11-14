const express= ('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { start } = require('repl');


const db = mysql.createConnection(
        {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'listofemployees_db'
        },
        console.log(`Connected to the listofemployees_db.`)
)

db.query = utils.promisify(db.query)
beginPrompt();
function beginPrompt() {
        inquirer.prompt([
                {
                        type: 'list',
                        name: 'category',
                        message: "What would you like to do?",
                        choices: [ 'View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department'],    
                },
        ])


}










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