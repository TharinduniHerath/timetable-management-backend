const express = require("express");
const router = express.Router();
const { restrict } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenhandler");
const {createBooking, updateBookingAvailability }= require("../controllers/bookingController");

//router.use(validateToken);
router.route("/").post(createBooking).put(restrict('admin'), updateBookingAvailability);



module.exports = router;