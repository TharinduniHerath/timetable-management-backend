const asyncHandler = require("express-async-handler");
const Notification = require('../models/notificationModel');

const createNotification = asyncHandler(async (req, res) => {
    console.log("the request body is :", req.body);
    //error handling of taking user inputs
    const { title, message, type } = req.body;
    const notification = await Notification.create({
        title,
        message,
        type
    })
    res.status(201).json(notification);
});

const getAllNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.status(200).json({ Notification });
});



module.exports = {
    createNotification,
    getAllNotifications
};
