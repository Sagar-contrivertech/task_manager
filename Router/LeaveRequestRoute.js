const express = require("express")
const Route = express.Router()
const LeaveRequestController = require("../controller/LeaveRequestController")

Route.post("/ApplyForRequest" , LeaveRequestController.ApplyForLeave)

Route.get("/GetAllLeaveRequest" , LeaveRequestController.GetAllLeaveRequet)

Route.post("/UpdateLeaveRequest" , LeaveRequestController.UpdateLeaveRequet)


module.exports = Route