CREATE DATABASE employee;

USE employee;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  INDEX dep_ind(department_id)
  CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name DECIMAL(30) NOT NULL,
  role_id INT NULL,
  manager_id PRIMARY KEY (id)
  INDEX man_ind(manager_id)
  CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES employee(id)
);
