process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const User = require("../models/userModel");

const server = require("../server");
chai.use(chaiHttp);

//Integration Testing of register user
describe('Testing User API ', () => {
    describe('Register User', () => {
        it('should register a new user', (done) => {

            const userData = {
                username: 'userTest',
                email: 'usertest@gmail.com',
                role: 'student',
                password: 'userTest123',
                confirmPassword: 'userTest123',
            }
            chai.request(server)
                .post('/api/users/register')
                .send(userData);

            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('username', 'userTest');
            res.body.should.have.property('email', 'usertest@gmail.com');
            done();
        });
    });

    //Integration Testing of Login user
    describe('Before Login User', () => {

        before(async () => {
            await User.create({
                email: 'usertest@gmail.com',
                password: 'userTest123'
            });
        });

        describe('Login User', () => {
            it('should login a user', (done) => {

                const loginUserData = {
                    email: 'usertest@gmail.com',
                    password: 'userTest123',

                }
                chai.request(server)
                    .post('/api/users/login')
                    .send(loginUserData);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('username', 'userTest');
                res.body.should.have.property('email', 'usertest@gmail.com');
                done();
            });
        });
    });
    //Inttegration testing of current User
    describe(' Current User', () => {

        before(async () => {
            await User.create({
                email: 'usertest@gmail.com',
                password: 'userTest123'
            });
        });

        describe('Current User', () => {
            it('should show current user data', (done) => {

                const currentUserData = {
                    email: 'usertest@gmail.com',
                    password: 'userTest123',

                }
                chai.request(server)
                    .post('/api/users/current')
                    .send(currentUserData);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('username', 'userTest');
                res.body.should.have.property('email', 'usertest@gmail.com');
                done();
            });
        });

    });

});

