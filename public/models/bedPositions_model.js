'use strict';

const mongoose = require('mongoose');
const {plantSchema} = require('./plant_model');
const bedPositionSchema = mongoose.Schema({
    occupied: Boolean,
    plantType: plantSchema,
    startDate: {type: Date, default: Date.now},
    harvestDate: Date
});

const BedPosition = mongoose.model('BedPosition',bedPositionSchema);

module.exports = {BedPosition,bedPositionSchema};