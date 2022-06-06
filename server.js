const express = require("express");
const cloudinary = require("cloudinary");

require("dotenv").config();

const app = express();


const fileUpload = require('express-fileupload')

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(fileUpload());

// clouinary
cloudinary.config({
  cloud_name: "contriver-tech",
  api_key: "876916662134773",
  api_secret: "pKhzOgDmU6PeUFpW1jwE38HraA4",
});

//

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

// app.get("/lead" , (req , res) => {
//     res.json({message : "Hello This is Lead Api Get"});
// })

app.listen(PORT, () => {
  console.log(`Server Is Running At Port No : ${PORT}`);
});
