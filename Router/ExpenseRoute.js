const express = require("express")
const Route = express.Router()
const ExpenseController = require("../controller/ExpenseController")

Route.post("/RegisterExpense" , ExpenseController.RegisterExpense)

module.exports = Route