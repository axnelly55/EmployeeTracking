const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Weinthere@50",
    database: "employeeDB",
  });

  connection.connect((err) => {
    if (err) {
     throw err;
    } 
    console.log("connected as id " + connection.threadId);
    connection.end();
  });
  
  module.exports = connection;