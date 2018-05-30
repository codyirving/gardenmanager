'use strict';

const mongoose = require('mongoose');
const mediaSchema = mongoose.Schema({
    title: String,
    mediaType: String,
    URL: String,
    notes: String
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = {Media};