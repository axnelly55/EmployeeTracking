const dbconnection = require("./connection.js")
var inquirer = require("inquirer");


class Database{
    createEmployee(employee) {
        return this.dbConnection.query("insert into employee set ?", employee)
    }
}

class position{
    createRole(role) {
        return this.dbConnection.query("insert into role set ?", role)
    }
}

class title{
    createDepartment(department) {
        return this.dbConnection.query("insert into department set?", role)
    }
}

