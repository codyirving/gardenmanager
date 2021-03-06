'use strict';

const mongoose = require('mongoose');
const {Plant} = require('./plant_model');
const bedPositionSchema = mongoose.Schema({
    occupied: Boolean,
    plantType: Plant.prototype.schema,
    startDate: {type: Date, default: Date.now},
    harvestDate: {type: Date, default: Date.now}
});

const BedPosition = mongoose.model('BedPosition',bedPositionSchema);

module.exports = {BedPosition};