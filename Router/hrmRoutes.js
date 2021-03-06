const express = require("express");
const hrmController = require("../controller/hrmController");
const { isAuthenticated, authorizeRoles } = require("../middleware/Auth");

const router = express.Router();

router.post("/hrmcreate/:id", hrmController.hrmReg);

// router.get("/hrmget", isAuthenticated, hrmController.hrmGet);
router.get("/hrmget",  hrmController.hrmGet);

router.get("/hrmget/:id", isAuthenticated, hrmController.getHrmId);

router.put("/hrmupdate/:id", isAuthenticated, hrmController.updateHrm);

router.delete("/hrmdelete/:id", isAuthenticated, hrmController.deleteHrm);

router.post("/hrmupdatesalary",hrmController.PostSalary);

module.exports = router;
