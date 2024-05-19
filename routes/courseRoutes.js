const express = require("express");
const router = express.Router();
const { restrict } = require("../controllers/userController");

const { getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deletecourse,
    assignFaculty,
} = require("../controllers/coursecontroller");

const validateToken = require("../middleware/validateTokenhandler");

router.use(validateToken);
router.route("/:id").get(getCourse).put(restrict('admin'),updateCourse).delete(deletecourse);
router.route("/").get(getCourses).post(createCourse).patch(restrict('admin'), assignFaculty);

module.exports = router;