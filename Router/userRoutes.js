const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

router.post("/signup", userController.registerUser);

router.get("/getuser", userController.getUser);

router.get("/getbyid/:id", userController.getUserById);

router.put("/updatebyid/:id", userController.updateUserById);

router.delete("/deletebyid/:id", userController.deleteUserById);

router.post("/login", userController.login);

module.exports = router;
