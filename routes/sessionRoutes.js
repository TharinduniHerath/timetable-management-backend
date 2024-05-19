const express = require("express");
const router = express.Router();
const { restrict } = require("../controllers/userController");

const { getSessions,
    getSession,
    createSession,
    updateSession,
    deleteSession } = require("../controllers/sessionController");

//const { createSession } = require("../controllers/sessionController");
const validateToken = require("../middleware/validateTokenhandler");

//router.use(validateToken);
router.route("/").post( createSession);
router.route("/:id").get(getSession).put(restrict('admin'), updateSession).delete(deleteSession).post(createSession);
router.route("/").get(getSessions)

module.exports = router;