var inquirer = require("inquirer");

//list of constants for the dif main menu action options
const VIEW_DEPARTMENTS = "View all departments";
const VIEW_ROLES = "View all roles";
const VIEW_EMPLOYEES = "View all employees";
const ADD_DEPARTMENT = "Add a department";
const ADD_ROLE = "Add a role";
const ADD_EMPLOYEE = "Add an Employee"
//const ADD_EMPLOYEE = "Add an employee";
const UPDATE_EMPLOYEE_ROLE = "Update an employee's role";

startUp();
//add to mainMenu function to display table of dept, roles, 
//and employee data (a full join!)
function startUp() {
  return inquirer
    .prompt({
      name: "mainAction",
      type: "list",
      message: "Choose a task:",
      choices: [VIEW_DEPARTMENTS, VIEW_ROLES, VIEW_EMPLOYEES, ADD_DEPARTMENT, ADD_ROLE, ADD_EMPLOYEE, UPDATE_EMPLOYEE_ROLE, "EXIT"],
    })
    .then((answer => {
      if (answer.mainAction === VIEW_DEPARTMENTS) {
        return viewDepartments();
      }
      if (answer.mainAction === VIEW_ROLES) {
        return viewRoles();
      }
      if (answer.mainAction === VIEW_EMPLOYEES) {
        return viewEmployees();
      }
      if (answer.mainAction === ADD_DEPARTMENT) {
        return addDepartment();
      }
      if (answer.mainAction === ADD_ROLE) {
        return addRole();
      }
      if (answer.mainAction === ADD_EMPLOYEE) {
        return addEmployee();
       }
       if (answer.mainAction === UPDATE_EMPLOYEE_ROLE) {
         return updateEmployeeRole();
      }
      connection.end();
    }))
    .catch((error) => {
      console.log(error);
      connection.end();
    });
};

function viewDepartments() {
  const allDepartments = `SELECT * FROM department;`;
  connection.query(allDepartments, (error, deptRows) => {
    if (error) {
      throw error;
    }
    console.table(deptRows);
    startUp();
  })
};

function viewRoles() {
  const allRoles = `SELECT * FROM roles;`;
  connection.query(allRoles, (error, roleRows) => {
    if (error) {
      throw error;
    }
    console.table(roleRows);
    startUp();
  })
};

function viewEmployees() {
  const allEmployees = `SELECT * FROM employee;`;
  connection.query(allEmployees, (error, employeeRows) => {
    if (error) {
      throw error;
    }
    console.table(employeeRows);
    startUp();
  })
};

function addDepartment() {
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "Enter the name of the department you wish to add:"
  })
  .then((answer) => {
    const addDept = `INSERT INTO department (name) VALUES (?);`;
    connection.query(addDept, answer.department, (error, response) => {
      if (error) {
        console.log(error);
      }
      console.log("New department added: " + answer.department + " !");
      viewDepartments();
    })
  })
  };

function addRole() {
  inquirer.prompt([
    {
    name: "role",
    type: "input",
    message: "Enter the name of the role you wish to add:"
  },
  {
    name: "salary",
    type: "input",
    message: "Enter the new role's salary amount:"
  },
  {
    name: "deptId",
    type: "input",
    message: "Please enter the Department ID"
  },
  ])
  .then((answer) => {
    const addRole = `INSERT INTO roles (title, salary, deptId) VALUES (?, ?, ?);`;
    const userInput = [answer.role, answer.salary, answer.deptId];
    connection.query(addRole, userInput, (error, response) => {
      if (error) 
      console.log(error);
    })
    console.log("New role added: " + answer.role + "!");
    viewRoles();
  })
};

function addEmployee() 
  { return connection.query("SELECT * FROM roles", (err, results) => {
    if (err) {
        throw err;
    }
      const roles = results.map((row) => row.title);
      // once you have the items, prompt the user for which they'd like to bid on
      return inquirer
          .prompt([
              {
                  name: "firstName",
                  type: "input",
                  message: "What is the first name of the new employee?",
              },
              {
                  name: "lastName",
                  type: "input",
                  message: "What is the last name of the new employee?",
              },
              {
                  name: "roleId",
                  type: "list",
                  choices: roles,
                  message: "What role would you like to assign?",
              },
          ])
          .then(function (choices) {
              return connection.query(
                  `INSERT INTO employees CONCAT(employees.firstName, " ", employees.lastName),
                  SET VALUES ?`,
                  [
                    {
                      firstName: choices.firstName,
                    },
                    {
                      lastName: choices.lastName,
                    },
                    {
                      roleId: choices.lastName,
                    },
                  ],
                  (error) => {
                    if (error) {
                      throw err;
                    }
                    console.log("Added new employee " + choices.firstName + " " + choices.lastName + "...\nSuccess!\n============================");
                    return start();
                  }
              );


          });
  
});
};

function updateEmployeeRole() {
  // get all the students
  const employeesSql = `
  SELECT
  employees.id AS ID,
  CONCAT(employees.firstName, " ", employees.lastName) AS Name,
  roles.title AS Role,
  departments.title AS Department
FROM employees
INNER JOIN roles ON employees.roleId = roles.id
INNER JOIN departments ON roles.deptId = departments.id;
  `;
  connection.query(employeesSql, (error, employeeRows) => {
      // display the results a formatted table
      if (error) {
          throw error;
      }
      console.table(employeeRows);
      inquirer
          .prompt({
              name: "employeeId",
              type: "input",
              message: "Enter employee id:",
          })
          .then((employeeChoiceAnswers) => {
              connection.query("SELECT * FROM roles;", (error, results) => {
                  console.table(results);
                  inquirer
                      .prompt({
                          name: "roleId",
                          type: "input",
                          message: "Enter new role id:",
                      })
                      .then((roleChoiceAnswers) => {
                          const employeeId = employeeChoiceAnswers.employeeId;
                          const roleId = roleChoiceAnswers.roleId;
                          connection.query(
                              "UPDATE employees SET roleId = ? WHERE id = ?;",
                              [roleId, employeeId],
                              (error, results) => {
                                  console.log("Updating employee role...\nSuccess!\n============================");
                                  start();
                              }
                          );
                      });
              });
          });
  });
};
