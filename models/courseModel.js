const mongoose = require("mongoose");

//schema will have all the values that are needed in a mongoose object
const courseSchema = mongoose.Schema({
    //fields
    /*user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },*/
    course_name:{
        type: String,
        required: [true, "Please add the course name: "],
    },
    code:{
        type: String,
        required: [true, "Please add the course code: "],
    },
    description:{
        type: String,
        required: [true, "Please add a course description: "],
    },
    credits:{
        type: Number,
        required: [true, "Please add the course credits: "],
    },
    Faculty:{
        type: String,
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Course", courseSchema);