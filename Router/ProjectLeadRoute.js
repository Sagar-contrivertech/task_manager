const express = require("express")
const Route = express.Router()
const ProjectLeadCont = require("../controller/ProjectLeadCont")

// for register project lead
Route.post("/RegisterProject" , ProjectLeadCont.RegisterProject)

// for get all the projects
Route.get("/GetProjects" , ProjectLeadCont.GetAllProjectLead)

// for updating project lead 
Route.put("/UpdateProject/:id" , ProjectLeadCont.Updateproject)

// for delete project lead 
Route.delete("/DeleteProject/:id" , ProjectLeadCont.DeleteProductLead)

module.exports = Route