const express = require("express")
const Route = express.Router()
const ExpenseController = require("../controller/ExpenseController")
const {isAuthenticated} = require("../middleware/Auth");


// Route.post("/RegisterExpense" ,isAuthenticated, ExpenseController.RegisterExpense)
Route.post("/RegisterExpense" , ExpenseController.RegisterExpense)

Route.get("/GetAllExpense" ,isAuthenticated, ExpenseController.GetAllExpense)

Route.put("/UpdateExpense/:id" ,isAuthenticated, ExpenseController.UpdateById)

Route.delete("/DeleteExpense/:id" ,isAuthenticated, ExpenseController.DeleteById)

module.exports = Route