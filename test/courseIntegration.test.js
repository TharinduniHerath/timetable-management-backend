process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const User = require("../models/courseModel");

const server = require("../server");
const { default: mongoose } = require('mongoose');
chai.use(chaiHttp);

describe('Integration Test of course API', () => {
    before((done) => {
        mongoose.connect('mongodb+srv://admin:admin123@devcluster.t2ejr1i.mongodb.net/university-timetable-backend-test?retryWrites=true&w=majority&appName=devCluster'), () => {
            mongoose.connection.db.dropDatabase(() => {
                done();
            });
        }
    });
});
describe('create a new new course ', () => {
    it('should create a new course', async () => {
        const courseData = {
            course_name: 'Test Course',
            code: 'This is a test course',
            description: 'This is a test course',
            credits: 'This is a test course'
        };
        await chai.request(server)
            .post('/api/courses/')
            .send(courseData);

        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('course_name', 'testcourse');
        res.body.should.have.property('code', 'IT1230');
        done();
    });
});
//view a course by id
describe('get a course by Id', () => {
    let courseId;

    before(async () => {
        const course = await chai
            .request(server)
            .post('/api/courses')
            .send({
                title: 'Test Course',
                description: 'This is a test course',
            });
        courseId = course.body._id;
    });

    it('should get a course by id', async () => {
        await chai.request(server)
            .get(`/api/courses/${courseId}`);

        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('title', 'Test Course');
        res.body.should.have.property('code', 'IT1230');
        res.body.to.have.property('_id', courseId);
    });

    it('should return 404 if course not found', async () => {
        await chai.request(server)
            .get(`/api/courses/${mongoose.Types.ObjectId()}`);
        res.should.have.status(404);
    });

    //update a course
    describe('update a course ', () => {
        let courseId;

        before(async () => {
            const course = await chai
                .request(server)
                .post('/api/courses')
                .send({
                    title: 'Test Course',
                    description: 'This is a test course',
                });
            courseId = course.body._id;
        });

        it('should update a course by id', async () => {
            await chai.request(server)
                .put(`/api/courses/${courseId}`);

            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('title', 'Test Course');
            res.body.should.have.property('code', 'IT1230');
            res.body.to.have.property('_id', courseId);
        });

        it('should return 404 if course not found', async () => {
            await chai.request(server)
                .get(`/api/courses/${mongoose.Types.ObjectId()}`);
            res.should.have.status(404);
        });

    });


    //delete a course testing
    describe('delete a course ', () => {
        let courseId;

        before(async () => {
            const course = await chai
                .request(server)
                .post('/api/courses')
                .send({
                    title: 'Test Course',
                    description: 'This is a test course',
                });
            courseId = course.body._id;
        });

        it('should delete a course by id', async () => {
            await chai.request(server)
                .delete(`/api/courses/${courseId}`);

            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('title', 'Test Course');
            res.body.should.have.property('code', 'IT1230');
            res.body.to.have.property('_id', courseId);
        });

        it('should return 404 if course not found', async () => {
            await chai.request(server)
                .get(`/api/courses/${mongoose.Types.ObjectId()}`);
            res.should.have.status(404);
        });

    });
});
