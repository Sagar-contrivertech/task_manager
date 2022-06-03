const Sprint = require("../controller/SprintController")
const express = require("express")
const Route = express.Router()

Route.post("/RegisterSprint" , Sprint.RegisterSprint)

Route.get("/GetSprint" , Sprint.GetSprint)

Route.get("/GetUserSprint/:id" , Sprint.GetUserSprint)

Route.put("/UpdateUserSprint/:id" , Sprint.UpdateUseidSprint)

Route.delete("/DeleteUserSprint/:id" , Sprint.DeleteSprint)

module.exports = Route