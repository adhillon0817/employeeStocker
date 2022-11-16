const express= ('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { start } = require('repl');
const { allowedNodeEnvironmentFlags } = require('process');


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
                        choices: [ 'View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Update employee', 'No action'],    
                },
        ])

        .then(response => {
                const {category} = response;
                console.log(category);
                switch (choice) {
                        case 'View all departments':
                                viewAllDepartments();
                                break;
                        case 'View all employees':
                                viewAllEmployees();
                                break;
                        case 'Add employee':
                                addEmployee();
                                break;
                        case 'Update employee role':
                                updateEmployeeRole();
                                break;
                        case 'View all roles':
                                viewAllRoles();
                                break;
                        case 'Add role':
                                addRole();
                                break;
                        case 'Add department':
                                addDepartment();
                                break;
                        case 'Update employee':
                                updateEmployee();
                                break;
                        default:
                                break;
                }
        });
}


//VIEW ALL DEPARTMENTS
const viewAllDepartments = async () => {
        const department = await db.query("SELECT * FROM department");
        console.table(department);
        beginPrompt();
}


//VIEW ALL EMPLOYEES
const viewAllEmployees = async () => {
        const worker = await db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,
                                               role.salary, CONCAT(e.first_name,' ',e.last_name) AS manager 
                                               FROM employee
                                               JOIN role ON employee.role_id = role.id
                                               JOIN department ON department.id = role.department_id
                                               LEFT JOIN employee ON employee.manager_id = e.id`);

        console.table(worker);
        beginPrompt();
}


// ADD EMPLOYEES






//UPDATE EMPLOYEE ROLE






//VIEW ALL ROLES
const viewAllRoles = async () => {
        const roles = await db.query (`SELECT role.id, role.title, department.name AS department, role.salary,
                                                FROM role
                                                JOIN department ON role.department_id=department.id`);
        console.table(roles);
        beginPrompt();
}


// ADD ROLE
const addRole = async () =>{
        const department = await db.query("SELECT * FROM department");

        };
//questionare for addding a role
        const response = await inquirer.prompt([
                {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of the role?'
                },
             
                {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?'
                },

                {
                        type: 'list',
                        name: 'category',
                        message:'Which department does the role belong to?',
                        choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
                },
        ])

}












//ADD DEPARTMENT
const addDepartment = async () => {
        const departmentChoice = await inquirer.prompt([
                {
                        type: "input",
                        name: "departchoice",
                        message: "What department would you like to add?", 
                },
        ]);

//ADD departchoice input into query
await db.query(
        "INSERT INTO department (name) VALUES(?)", [departmentChoice.departChoice]);

//console log message.
        console.log( departmentChoice.departChoice + "is added to the database!" );
        beginPrompt();
        console.log("Done");
}