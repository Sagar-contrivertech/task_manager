const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");
const { isAuthenticated, authorizeRoles } = require("../middleware/Auth");


router.post("/employeereg", isAuthenticated, employeeController.employeeRegister);

router.get("/employeeget", isAuthenticated, employeeController.getEmploy);

router.get("/employeeget/:id", isAuthenticated, employeeController.getEmployById);

router.put("/employeeupdate/:id", isAuthenticated, employeeController.updateById);

router.delete("/employeedelete/:id", isAuthenticated, employeeController.deleteById);

//leaves route include in employee

router.post("/leaves", employeeController.addleaves)

module.exports = router;
