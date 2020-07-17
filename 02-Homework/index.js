
//list of constants for the dif main menu action options
const VIEW_DEPARTMENTS = "View all departments";
const VIEW_ROLES = "View all roles";
const VIEW_EMPLOYEES = "View all employees";
const ADD_DEPARTMENT = "Add a department";
const ADD_ROLE = "Add a role";
//const ADD_EMPLOYEE = "Add an employee";
const UPDATE_EMPLOYEE_ROLE = "Update an employee's role";


//add to mainMenu function to display table of dept, roles, 
//and employee data (a full join!)
function mainMenu() {
  return inquirer
    .prompt({
      name: "mainAction",
      type: "list",
      message: "Choose a task:",
      choices: [VIEW_DEPARTMENTS, VIEW_ROLES, VIEW_EMPLOYEES, ADD_DEPARTMENT, ADD_ROLE, UPDATE_EMPLOYEE_ROLE, "EXIT"],
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
      // if (answer.mainAction === ADD_EMPLOYEE) {
      //   return addEmployee();
      // }
      // if (answer.mainAction === UPDATE_EMPLOYEE_ROLE) {
      //   return updateEmployeeRole();
      // }
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
    mainMenu();
  })
};

function viewRoles() {
  const allRoles = `SELECT * FROM roles;`;
  connection.query(allRoles, (error, roleRows) => {
    if (error) {
      throw error;
    }
    console.table(roleRows);
    mainMenu();
  })
};

function viewEmployees() {
  const allEmployees = `SELECT * FROM employee;`;
  connection.query(allEmployees, (error, employeeRows) => {
    if (error) {
      throw error;
    }
    console.table(employeeRows);
    mainMenu();
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

// function addEmployee() {};
// function updateEmployeeRole() {};
