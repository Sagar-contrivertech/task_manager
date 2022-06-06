const express = require("express");
const app = express();
require("dotenv").config();

// initializing that this project send the json data
app.use(express.json());

const PORT = process.env.PORT || 3000;

// database connection
require("./config/db");

//user route path
const userRoutes = require("./Router/userRoutes");
app.use("/api", userRoutes);

// projectlead path
const ProjectLead = require("./Router/ProjectLeadRoute");
app.use("/Lead", ProjectLead);

// Expense Route
const ExpensesTrack = require("./Router/ExpenseRoute");
app.use("/Expenses", ExpensesTrack);

// Income Route
const IncomeTrack = require("./Router/IncomeRoute");
app.use("/Incomes", IncomeTrack);

// employee path route
const EmployeeRoute = require("./Router/employeeRoute");
app.use("/api", EmployeeRoute);

// hrm path route
const HrmRouter = require("./Router/hrmRoutes");
app.use("/api", HrmRouter);

// status route
const statusRouter = require("./Router/statusRoute");
app.use("/api", statusRouter);
// Sprint path route
const SprintRouter = require("./Router/SprintRoute");
app.use("/sprint", SprintRouter);


const LeaveApproval = require("./Router/LeaveRequestRoute")
app.use("/LeaveRequest" , LeaveApproval)

// app.get("/lead" , (req , res) => {
//     res.json({message : "Hello This is Lead Api Get"});
// })

app.listen(PORT, () => {
  console.log(`Server Is Running At Port No : ${PORT}`);
});
