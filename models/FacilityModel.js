const mongoose = require("mongoose");
const FacilitiesSchema =  mongoose.Schema({
    name: String,
    statues: String,
    bookings: [{
        start: Date,
        end: Date
    }]
},{
    timestamps: true,
});

module.exports = mongoose.model("Facilities", FacilitiesSchema);