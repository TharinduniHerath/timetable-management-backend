 //asynchandler autumatically cathes exceptions when occured will pass to the errorhandler
const asyncHandler = require("express-async-handler");
//contain all logic for the request response
const Course = require("../models/courseModel");

//@desc Get All Courses
//@route GET api/courses
//@access public
const getCourses = asyncHandler(async(req, res) => {
    const courses = await Course.find();
    res.status(200).json({ courses });
});

//@desc get a particular course
//@route get api/courses
//@access public
const getCourse = asyncHandler(async(req, res) => { 
    const course = await Course.findById(req.params.id);
    if (!course){
        res.status(404);
        throw new Error("Course not found!");
    }
    res.status(200).json(course);
});


//@desc create a new course
//@route post api/courses
//@access private
const createCourse = asyncHandler(async(req, res) => {
    console.log("the request body is :", req.body);
    const { course_name, code, description, credits } = req.body;
    //check whether fields are empty
    if (!course_name || !code || !description || !credits) {
        res.status(400);
        throw new Error("All fileds are mandtory");
    }
    const course = await Course.create({
        course_name,
        code,
        description,
        credits,
       // user_id:req.user.id,
    })
    res.status(201).json(course);
});

/*if(course.user_id.toString() !== req.user.id){
    res.status(403);
    throw new error ("User do not hav the permission")
}
*/

//@desc update a course
//@route put api/courses
//@access private
const updateCourse =asyncHandler(async(req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course){
        res.status(404);
        throw new Error("Course not found!");
    }
    const updateCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );
    res.status(200).json(updateCourse);
});

//@desc delete  a course
//@route delete api/courses
//@access private
const deletecourse = async(req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course){
        res.status(404);
        throw new Error("Course not found!");
    }
    await Course.deleteOne();
    res.status(200).json(course);

};

//@desc assign a faculty
//@route post api/courses
//@access private/admin
const assignFaculty = asyncHandler(async(req, res) => {
    console.log("the request body is :", req.body);
    const { course_Id, Faculty } = req.body;
    if (!course_Id || !Faculty) {
        res.status(400);
        throw new Error("All fileds are mandtory");
    }
    const course = await Course.findById(course_Id);
    if (!course){
        res.status(404);
        throw new Error("Course not found!");
    }
    course.Faculty = Faculty;
    await course.save();
    res.status(201).json(course);
});



module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deletecourse,
    assignFaculty
};

//middleware - epress async handler handles the exceptions inside 
//the async expreess routes
//to do that npm install express async handler

//inmongodb collection is similar to a database you add data as records 
//in json format
 