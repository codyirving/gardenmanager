'use strict';

const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    message: String
});

const Notification = mongoose.model('Notification',notificationSchema);

module.exports = {Notification,notificationSchema};