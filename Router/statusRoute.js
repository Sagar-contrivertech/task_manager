const express = require("express");
const statusController = require("../controller/statusController");
const { isAuthenticated, authorizeRoles } = require("../middleware/Auth");

const router = express.Router();

router.post("/statusset", statusController.setStatus);

router.get("/statusget",isAuthenticated, statusController.getStatus);

router.get("/statusget/:id",isAuthenticated, statusController.getByIdStatus);

router.put("/statusupdate/:id", statusController.updateStatus);

router.delete("/statusdelete/:id",isAuthenticated, statusController.deleteStatus);

router.post("/statusclockin",isAuthenticated, statusController.clockInStatus);

router.post("/statusclockout",isAuthenticated, statusController.clockOutStatus);

module.exports = router;
