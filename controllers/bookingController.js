const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const Facility = require("../models/FacilityModel");

//private
const createBooking = asyncHandler(async (req, res) => {
    const { facilityId, startDate, enddate } = req.body;
    const facility = await Facility.findById(facilityId);
    if (!facility) {
        res.status(404);
        throw new Error("facility not found!");
    }
    const overlappingBooking = facility.bookings.some(booking => {
        return (startDate < booking.end && enddate > booking.start);
    });

    if (overlappingBooking) {
        return res.status(400).json({ error: "facility already booked" });
    }
    //facility.status.;
    facility.bookings.push({ startDate, enddate });
    await facility.create();
    res.status(200).json({ message: "Booking created" });
    console
});


const updateBookingAvailability = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        res.status(404);
        throw new Error("booking not found!");
    }
    const updateCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateCourse);
});


module.exports = {
    createBooking,
    updateBookingAvailability,
};