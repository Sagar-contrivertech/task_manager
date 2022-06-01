const express = require("express");
const {isAuthenticated} = require("../middleware/Auth");

const router = express.Router();

const userController = require("../controller/userController");

router.post("/signup", userController.registerUser);

router.get("/getuser",isAuthenticated, userController.getUser);

router.get("/getbyid/:id",isAuthenticated, userController.getUserById);

router.put("/updatebyid/:id",isAuthenticated, userController.updateUserById);

router.delete("/deletebyid/:id",isAuthenticated, userController.deleteUserById);

router.post("/login", userController.login);

module.exports = router;
