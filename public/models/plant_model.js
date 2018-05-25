'use strict';

const mongoose = require('mongoose');
const plantSchema = mongoose.Schema({
    commonName: String,
    botanicalName: String,
    daysToHarvest: Number,
    imgURLs: [String],
    wikiURL: String,
    iconURL: String
});

const Plant = mongoose.model('Plant',plantSchema);

module.exports = {Plant,plantSchema};