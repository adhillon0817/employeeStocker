// const express= ('express');
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const util = require('util');
// const { start } = require('repl');
// const { allowedNodeEnvironmentFlags } = require('process');

const database = mysql.createConnection(
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
      console.error(err);
    } else {
      console.table(data);
      beginPrompt();
    }
  });
};



//VIEW ALL ROLES

viewAllRoles = () => {
  database.query(
    'SELECT roles.id, roles.title AS position, roles.salary AS Pay, department.name_department AS Depart FROM roles JOIN department ON roles.department_id = department.id;',
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



//VIEW ALL EMPLOYEES
viewAllEmployees = () => {
  database.query(
    'SELECT e.id, CONCAT (e.first_name," ", e.last_name) AS Employee, roles.title AS position, department.name_department AS Depart, roles.salary AS Pay, CONCAT (e.first_name," ", e.last_name) AS manager FROM employee AS e JOIN roles ON e.role_id = roles.id JOIN department ON roles.department_id LEFT JOIN employee m ON m.id = e.manager_id;',
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
                name: "roleDepartment",
                choices: departArray,
        },
        {
                type: "number",
                message: "What is the set pay?",
                name: "newRolePay",
        },

      ])

      .then((answers) => {
        const newRole = answers.newRole;
        const roleDepartment = answers.roleDepartment;
        const newRolePay = answers.newRolePay;
        database.query(`INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?);`, [newRole, roleDepartment, newRolePay], (err, result) => {
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
                                choices: rolesArray,
                                name: "employeeNewRole",
                        },
                        {
                                type: "list",
                                message: "Enter employee's manager.",
                                choices: empArray,
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
                {
                        type: "list",
                        message: "Select employee to update.",
                        choices: empArray, 
                        name: "employeeUpdate"
                },
                {
                        type:"list",
                        message:"Enter new role.",
                        choices: rolesArray,
                        name: "employeeRoleUpdate",
                },
        ])

        .then((answers) => {
                const employeeUpdate = answers.employeeUpdate;
                const employeeRoleUpdate = answers.updateEmployeeRole;
                database.query('UPDATE employee SET role_id = ? WHERE id = ?;', [employeeUpdate, employeeRoleUpdate], (err,result) => {
                        if (err) {
                                console.error
                        }else {
                                console.log('Updated!')
                                beginPrompt();
                        }
                })
        })
                }
        });
                }
        });
}












      
beginPrompt = () => {
  inquirer.prompt([
      {
        type: "list",
        name: "beginPrompt",
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
        ]
      },
    ])

    .then((response) => {
        switch (response.beginPrompt) {
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
})
};

beginPrompt();