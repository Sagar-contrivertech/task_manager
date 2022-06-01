const express = require("express")
const Route = express.Router()
const IncomeContoller = require("../controller/IncomeController")
const {isAuthenticated , authorizeRoles} = require("../middleware/Auth");

Route.post("/RegisterIncome" , isAuthenticated ,  authorizeRoles('admin') ,IncomeContoller.RegisterIncome)
Route.get("/GetAllIncome" , isAuthenticated , authorizeRoles('admin') ,  IncomeContoller.GetAllIncome)
Route.put("/UpdateIncome/:id" ,isAuthenticated , IncomeContoller.UpdateIncomeById)
Route.delete("/DeleteIncome/:id" ,isAuthenticated, IncomeContoller.DeleteIncomeById)

module.exports = Route