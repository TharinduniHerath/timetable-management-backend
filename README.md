[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)

# Project Setup Instructions
Node.js  installation: [Download Node.js](https://nodejs.org/)
MongoDB installation: [Download MongoDB](https://www.mongodb.com/)
## Installation of Dependencies
npm install bcrypt
npm install cross-env
npm install dotenv
npm install express
npm install express-async-handler
npm install express-validator
npm install jsonwebtoken
npm installmongoose
  
npm install --save-dev mocha chai chai-http

## Enviornment variables
PORT, CONNECTION_STRING, ACCESS_TOKEN_SECRET 

## Run the project
npm run dev

## Testing
npm test

# API endpoint documentation

## Introduction
This API provides endpoints for managing user data.
## API Overview
Base URL: 'http://localhost:5001/api'

## Endpoints

### Get current user data
Method: GET
Path: '/users/current'
### Login User 
Method: POST
Path: '/users/login'
### Register User
Method: POST
Path: '/users/register'


### Get Sessions
Method: GET
Path: '/users/sessions/'
### Get a Session
Method: GET
Path: '/users/sessions/:id'
### Create a Session
Method: POST
Path: '/users/sessions/'
### Update a Session
Method: PUT
Path: '/users/sessions/:id'
### Delete a Session
Method: Delete
Path: '/users/sessions/:id'


### Create Notifications
Method: POST
Path: '/notifications/createNotification/'
### Get all Notifications
Method: GET
Path: '/notifications/getAllNotifications/'


### Get a Course
Method: GET
Path: '/courses/:id'
### Get  Courses
Method: GET
Path: '/courses/'
### Create a Course
Method: POST
Path: '/courses/'
### Update a Course
Method: PUT
Path: '/courses/:id'
### Delete a Course
Method: Delete
Path: '/courses/:id'


