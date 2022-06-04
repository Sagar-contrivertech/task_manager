const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middleware/Auth");

const router = express.Router();

const userController = require("../controller/userController");

router.post("/signup", userController.registerUser);

// router.get("/getuser", isAuthenticated, authorizeRoles('read'), userController.getUser);
router.get("/getuser",   userController.getUser);

router.get("/getbyid/:id",  userController.getUserById);

router.put("/updatebyid/:id", isAuthenticated, userController.updateUserById);

router.delete("/deletebyid/:id", isAuthenticated, userController.deleteUserById);

router.post("/login", userController.login);


router.post("/AddLeaves", userController.addleaves);



module.exports = router;
