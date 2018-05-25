'use strict';

const mongoose = require('mongoose');

const soilLogSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    action: String
});

const SoilLog = mongoose.model('SoilLog',soilLogSchema);

module.exports = {SoilLog, soilLogSchema};