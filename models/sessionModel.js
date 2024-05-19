const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  courseId:{
        type:String,
        required: true
    },
      startTime: {
        type: Date,
        required: true
      },
      endTime: {
        type: Date,
        required: true
      },
      locationId: {
        type: String,
        required: true
      },
},{
    timestamps:true,
});


module.exports = mongoose.model("Sessions", sessionSchema);