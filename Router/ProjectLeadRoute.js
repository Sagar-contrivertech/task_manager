const express = require("express")
const Route = express.Router()
const ProjectLeadCont = require("../controller/ProjectLeadCont")
const {isAuthenticated} = require("../middleware/Auth");

// for register project lead
Route.post("/RegisterProject" , isAuthenticated , ProjectLeadCont.RegisterProject)

// for get all the projects
Route.get("/GetProjects" , isAuthenticated , ProjectLeadCont.GetAllProjectLead)

// for updating project lead 
Route.put("/UpdateProject/:id" , isAuthenticated , ProjectLeadCont.Updateproject)

// for delete project lead 
Route.delete("/DeleteProject/:id" , isAuthenticated , ProjectLeadCont.DeleteProductLead)

module.exports = Route