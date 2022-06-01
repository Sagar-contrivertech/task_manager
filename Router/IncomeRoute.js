const express = require("express")
const Route = express.Router()
const IncomeContoller = require("../controller/IncomeController")
const {isAuthenticated} = require("../middleware/Auth");

Route.post("/RegisterIncome" , isAuthenticated ,IncomeContoller.RegisterIncome)
Route.get("/GetAllIncome" , isAuthenticated, IncomeContoller.GetAllIncome)
Route.put("/UpdateIncome/:id" ,isAuthenticated , IncomeContoller.UpdateIncomeById)
Route.delete("/DeleteIncome/:id" ,isAuthenticated, IncomeContoller.DeleteIncomeById)

module.exports = Route