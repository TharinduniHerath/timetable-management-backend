const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({

    facilityId: {
        type: String,
        required: true,
    },
    bookingstartDate: {
        type: String,
        required: true,
    },

    bookingenddate: {
        type: String,
        required: [true, "Please add the email: "]

    },
}, {
    timestamps: true,
}
);


module.exports = mongoose.model("Booking", BookingSchema);