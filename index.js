// const express= ('express');
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const util = require('util');
// const { start } = require('repl');
// const { allowedNodeEnvironmentFlags } = require('process');

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "listofemployees_db",
  },
  console.log(`Connected to the listofemployees_db.`)
);

// db.query = util.promisify(db.query)

//VIEW ALL DEPARTMENTS

viewAllDepartments = () => {
  database.query("SELECT * FROM department", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.table(data);
      beginPrompt();
    }
  });
};

// const viewAllDepartments = async () => {
//         const department = await db.query("SELECT * FROM department");
//         console.table(department);
//         beginPrompt();
// }

//VIEW ALL ROLES

viewAllRoles = () => {
  database.query(
    "SELECT roles.id, roles.title AS, position, roles.salary AS Pay, department.name_department AS Depart FROM roles JOIN department ON roles.department_id = departments.id;",
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.table(data);
        beginPrompt();
      }
    }
  );
};

// const viewAllRoles = async () => {
//         const roles = await db.query (`SELECT role.id, role.title, department.name AS department, role.salary,
//                                                 FROM role
//                                                 JOIN department ON role.department_id=department.id`);
//         console.table(roles);
//         beginPrompt();
// }

//VIEW ALL EMPLOYEES
viewAllEmployees = () => {
  database.query(
    'SELECT e.id, CONCAT (e.first_name," ", e.last_name) AS Employee, roles.title AS position, department.name_department AS Depart, roles.salary AS Pay, CONCAT (e.first_name," ", e.last_name) AS manager FROM employee AS e JOIN roles ON e.role_id = roles.id JOIN department ON roles.deparment_id LEFT JOIN employee m ON m.id = e.manager_id;',
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.table(data);
        beginPrompt();
      }
    }
  );
};

// const viewAllEmployees = async () => {
//         const worker = await db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,
//                                                role.salary, CONCAT(e.first_name,' ',e.last_name) AS manager
//                                                FROM employee
//                                                JOIN role ON employee.role_id = role.id
//                                                JOIN department ON department.id = role.department_id
//                                                LEFT JOIN employee ON employee.manager_id = e.id`);

//         console.table(worker);
//         beginPrompt();
// }

//ADD DEPARTMENT
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "departchoice",
      },
    ])
    .then((answers) => {
      const newDepartment = answers.departchoice;
      database.query(
        "INSERT INTO department (name_department) VALUES (?);",
        newDepartment,
        (err, data) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`${newDepartment} added!`);
            beginPrompt();
          }
        }
      );
    });
};

// const addDepartment = async () => {
//         const departmentChoice = await inquirer.prompt([
//           {
//             type: "input",
//             name: "departchoice",
//             message: "What department would you like to add?",
//           },
//         ]);
//ADD departchoice input into query
//   await db.query("INSERT INTO department (name) VALUES(?)", [
//         departmentChoice.departChoice,
//       ]);

//       //console log message.
//       console.log(departmentChoice.departChoice + "is added to the database!");
//       beginPrompt();
//       console.log("Done");
//     };


// ADD ROLE

addRole = () => {
  database.query("SELECT * FROM department", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const departArray = data.map(function(department){
        return {name: department.name_department, value: department.id}
      })
      inquirer.prompt([
        {
                type: "input",
                message: "What is the role title?",
                name: "newRole",
        },
        {
                type: "list",
                message: "Which department does this go under?",
                name: "departArray",
        },
        {
                type: "number",
                message: "What is the set pay?",
                name: "newRolePay",
        },

      ])

      .then((answers) => {
        const newRole = answers.newRole;
        const departArray = answers.deparyArray;
        const newRolePay = answers.newRolePay;
        database.query(`INSERT INTO roles (title, deparment_id, salary) VALUES (?, ?, ?);`, [newRole, departArray, newRolePay], (err, result) => {
                if(err) {
                        console.error(err)
                }else{
                        console.log(`${newRole} added!`);
                        beginPrompt();
                }
        }) 
      })
    }
  }
  );

}

// const addRole = async () => {
//         const department = await db.query("SELECT * FROM department");

//         //questionare for adding a role
//         const response = await inquirer.prompt([
//           {
//             type: "input",
//             name: "title",
//             message: "What is the name of the role?",
//           },

//           {
//             type: "input",
//             name: "salary",
//             message: "What is the salary of the role?",
//           },

//           {
//             type: "list",
//             name: "category",
//             message: "Which department does the role belong to?",
//             choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
//           },
//         ]);
//         await db.query(`INSERT INTO role(title,salary,department_id) VALUES(?,?,?)`, [
//           answers.title,
//           answers.salary,
//           answers.category,
//         ]);
//         beginPrompt();
//       };



// ADD EMPLOYEES
addEmployee = () => {
        database.query('SELECT * FROM roles', (err,data) => {
                if (err) {
                        console.error(err)
                }else{
                        const rolesArray = data.map(function(roles) {
                        return {name: roles.title, value: roles.id}
                        })
        database.query('SELECT * FROM employee', (err,data) => {
                if (err) {
                        console.error(err)
                } else {
                        const empArray = data.map(function(employee) {
                        return {name: employee.first_name + ` ` + employee.last_name, value: employee.id}
                })
                inquirer.prompt([
                        {
                                type: "input",
                                message: "Enter employee's first name.",
                                name: "employeeFirstName",
                        },

                        {
                                type: "input",
                                message: "Enter employee's last name.",
                                name: "employeeLastName",
                        },

                        {
                                type: "list",
                                message: "Enter employee's role.",
                                choices: "rolesArray",
                                name: "employeeNewRole",
                        },
                        {
                                type: "list",
                                message: "Enter employee's manager.",
                                choices: "empArray",
                                name: "employeeNewManager",
                        },
                ])
                .then((answers) => {
                        const employeeFirstName = answers.employeeFirstName;
                        const employeeLastName = answers.employeeLastName;
                        const employeeNewRole = answers.employeeNewRole;
                        const employeeNewManager = answers.employeeNewManager;
                        database.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [employeeFirstName, employeeLastName, employeeNewRole, employeeNewManager], (err,result) => {
                                if (err) {
                                        console.error(err)
                                } else {
                                        console.log (`${employeeFirstName} ${employeeLastName} added!`)
                                        beginPrompt();
                                }
                        })
                })
                
                }
        });
        
                }
        });
}




// const addEmployee = async () => {
//         const newEmployee = await db.query(`SELECT id, title 
//                                               FROM role`);
      
//         const employee = await db.query(`SELECT id, first_name, last_name 
//                                        FROM employee`);
      
//         // EMPLOYEE ADDITION QUESTIONARE
//         const reply = await inquirer.prompt([
//           {
//             type: "input",
//             name: "first_name",
//             message: "What is the first name of the employee?",
//           },
      
//           {
//             type: "input",
//             name: "last_name",
//             message: "What is the last name of the employee?",
//           },
      
//           {
//             type: "list",
//             name: "employeeRole",
//             message: "What is the role the employee is assigned to?",
//             choices: [
//               "Sales Lead",
//               "Salesperson",
//               "Lead Engineer",
//               "Account Manager",
//               "Accountant",
//               "Legal Team Lead",
//               "Lawyer",
//               "Customer Service",
//             ],
//           },
      
//           {
//             type: "list",
//             name: "employeeManager",
//             message: "Who is their assigned manager?",
//             choices: [
//               "John Doe",
//               "Mike Chan",
//               "Ashley Rodriguez",
//               "Kevin Tupik",
//               "Kunal Singh",
//               "Malia Brown",
//             ],
//           },
//         ]);
//         await db.query(
//           `INSERT INTO employee( first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,
//           [
//             reply.first_name,
//             reply.last_name,
//             reply.employeeRole,
//             reply.employeeManager,
//           ]
//         );
//         console.log(first_name + last_name + "is added!");
//         beginPrompt();
//       };






//UPDATE EMPLOYEE ROLE
updateEmployeeRole = () => {
        database.query('SELECT * FROM employee', (err,data) => {
                if (err) {
                        console.error(err)
                } else {
                        const empArray = data.map(function(employee) {
                        return {name: employee.first_name + ` ` + employee.last_name, value: employee.id}
                })

        database.query('SELECT * FROM roles', (err,data) => {
                if (err) {
                        console.error(err)
                } else {
                        const rolesArray = data.map(function(roles) {
                        return {name: roles.title, value: roles.id}
                        })
        inquirer.prompt([
                
        ])
                }
        })
                }
        })
}












// const updateEmployeeRole = async () => {
//         const employeeUpdate = await db.query(`SELECT * FROM employee`);
//         const update = await inquirer.prompt([
//           {
//             type: "list",
//             name: "updateName",
//             message: "Which employee's role do you want to update?",
//             choices: [
//               "John Doe",
//               "Mike Chan",
//               "Ashley Rodriguez",
//               "Kevin Tupik",
//               "Kunal Singh",
//               "Malia Brown",
//             ],
//           },
      
//           {
//             type: "list",
//             name: "updateRole",
//             message: "What role do you want to assign to the selected user?",
//             choices: [
//               "Sales Lead",
//               "Salesperson",
//               "Lead Engineer",
//               "Account Manager",
//               "Accountant",
//               "Legal Team Lead",
//               "Lawyer",
//               "Customer Service",
//             ],
//           },
//         ]);
//         console.log("Employee is updated!");
//         beginPrompt();
//       };
      
function beginPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "category",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Add employee",
          "Update employee role",
          "View all roles",
          "Add role",
          "View all departments",
          "Add department",
          "Update employee",
          "No action",
        ],
      },
    ])

    .then((response) => {
      const { category } = response;
      console.log(category);
      switch (category) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add role":
          addRole();
          break;
        case "Add department":
          addDepartment();
          break;
        default:
          break;
      }
    });
}