-- test for department table
INSERT INTO department(name)
VALUES 
("Infomation Technolgy"),
("Corporate"),
("Marketing"),
("Human Resources")
;

-- test for role table
INSERT INTO role(title, salary, department_id)
VALUES ("accountant", 80000.00, 1),
("sales", 75000.00, 2),
("marketer", 84000.00, 2),
("researcher", 79000.00, 3),
("finance", 100000.00, 1),
("administration", 65000, 2),
("engineer", 120000, 3)
;

-- test for employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Quintos", 1, 11),
("Aaron", "Nelson", 2, 12),
("Simon", "Rahi", 3, 13),
("Tizzy", "Nelly", 1, 14),
("Mello", "Gello", 1, 15),
("Tig", "Gliz", 3, 16)
;