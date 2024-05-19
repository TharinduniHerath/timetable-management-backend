/*process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const Course = require("../models/courseModel");

const server = require("../server");
chai.use(chaiHttp);

describe('delete a course ', () => {
        let course;

        beforeEach((done), () => {
            course = new Course({
                course_name: 'Test Course',
                code: 'This is a test course',
                description: 'This is a test course',
                credits: 'This is a test course'
            });
            course.save()
                .then(() => done());
        });
        it('deletes a course ', (done) => {
            course.deleteOne()
            .then(()=> Course.findOne({course_name: 'Test Course',}))
            .then((course) =>{
                
            })
    });
});
*/