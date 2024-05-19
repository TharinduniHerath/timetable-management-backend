const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenhandler");
const { createNotification,
    getAllNotifications } = require("../controllers/notificationController");


//router.use(validateToken);
router.post("/", createNotification);
router.get("/", getAllNotifications);


module.exports = router;