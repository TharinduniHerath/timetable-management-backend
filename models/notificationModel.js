// models/notification.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['timetable', 'room', 'announcement'],
    required: true
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
