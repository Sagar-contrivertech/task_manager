const Sprint = require("../controller/SprintController")
const Task = require('../controller/task')
const express = require("express")
const { route } = require("./userRoutes")
const Route = express.Router()

Route.post("/RegisterSprint" , Sprint.RegisterSprint)

Route.get("/GetSprint" , Sprint.GetSprint)

Route.get("/GetUserSprint/:id" , Sprint.GetUserSprint)

Route.put("/UpdateUserSprint/:id" , Sprint.UpdateUseidSprint)

Route.delete("/DeleteUserSprint/:id" , Sprint.DeleteSprint)


//task routes started

Route.post('/addtask',Task.addTask)

module.exports = Route