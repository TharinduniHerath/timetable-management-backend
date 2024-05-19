const Student = require('../models/student');
const Course = require('../models/course');

const enrollStudent = asyncHandler(async(req, res) => {
    console.log("the request body is :", req.body);
    const { StudentId, courseId } = req.body;
    if (!student) {
        throw new Error('Student not found');
      }
    const student = await Student.findById(StudentId);

    if (student.enrolledCourses.includes(courseId)) {
        throw new Error('Student is already enrolled in this course');
      }
      student.enrolledCourses.push(courseId);
      await student.save();
      return student;
    
});


//@desc get the courses enrolled by a student
//@route put api/contacts
//@access private
const getEnrolledCourses = asyncHandler(async(req, res) => { 
    const StudentId = req.params.id;
    const enrolledCourses = await Course.find({user_id: StudentId});
    res.status(200).json(enrolledCourses);
});

const getEnrolledStudents = asyncHandler(async(req, res) => { 
    const course_Id = eq.params.id;
    const enrolledStudents = await Student.find({enrolledCourses: course_Id});
    res.status(200).json(enrolledStudents);
});



//@desc update a course
//@route put api/contacts
//@access private
const updateEnrolledStudents =asyncHandler(async(req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student){
        res.status(404);
        throw new Error("student not found!");
    }
    const updateEnrollment = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );
    res.status(200).json(updateEnrollment);
});
module.exports={
    enrollStudent,
    getEnrolledStudents
}
