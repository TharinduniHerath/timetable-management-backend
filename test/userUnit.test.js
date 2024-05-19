process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const User = require("../models/userModel");

const server = require("../server");
chai.use(chaiHttp);

//Unit Testing of register user
describe('Testing User API ', () => {
    describe('Register User unit test', () => {
        it('should register a new user', (done) => {
            const tempUser = {
                username: 'userTest',
                email: 'usertest@gmail.com',
                role: 'student',
                password: 'userTest123',
                confirmPassword: 'userTest123',
            };
            let tempToken;

            describe("register new users", () => {
                it("should register new user with valid credentials", (done) => {
                    chai.request(server)
                        .post("/api/users/register")
                        .send(tempUser)
                        .expect(201)
                        .then((res) => {
                            expect(res.body.username).to.be.eql('userTest');
                            done();
                        })
                });


                it("shouldn't accept the email that already exists in the database", (done) => {
                    chai.request(server)
                        .post("/api/users/register")
                        .send(tempUser)
                        .expect(400)
                        .then((res) => {
                            expect(res.body.message).to.be.eql("User is already in use");
                            done();
                        })
                });
            });
            describe("Login users", () => {
                it("should accept correct credentials", (done) => {
                    chai.request(server)
                        .patch("api/users/login")
                        .send(tempUser)
                        .expect(200)
                        .then((res) => {
                            expect(res.body.message).to.be.eql("User logged in successfully");
                            tempToken = `Bearer ${res.body.accessToken}`;
                            done();
                        })

                });
                it("shouldn't accept a invalid password", (done) => {
                    tempUser.password = 'userTest123';
                    chai.request(server)
                        .post("api/users/login")
                        .send(tempUser)
                        .expect(400)
                        .then((res) => {
                            expect(res.body.message).to.be.eql("Invalid password");
                            done();
                        })

                });
                it("shouldn't accept non-exisiting email", (done) => {
                    tempUser.email = 'usertest@gmail.com';
                    chai.request(server)
                        .post("api/users/login")
                        .send(tempUser)
                        .expect(404)
                        .then((res) => {
                            expect(res.body.message).to.be.eql("Account not found");
                            done();
                        })

                });
            });
        });
    });
});