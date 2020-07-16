const dbconnection = require("./connection.js")

class Database{
    createEmployee(employee) {
        return this.dbConnection.query("insert into employee set ?", employee)
    }
}

