'use strict';

const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    phoneNumber: String,
    email: String,
    address: String
});

const Contact = mongoose.model('Contact',contactSchema);

module.exports = {Contact, contactSchema};