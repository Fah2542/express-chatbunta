const express = require('express');
const app = express();
const employeeController = require("../controllers/employeeController")

app.get("/",employeeController.getEmployees);
app.get("/:id",employeeController.getEmployeeById);
app.get("/tax/:sal",employeeController.getEmployeeTax);
app.get("/retire/:age",employeeController.getEmployeeRetire);

app.post("/",employeeController.addEmployee);


module.exports = app;