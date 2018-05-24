'use strict';

const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    content: String
});
const plantSchema = mongoose.Schema({
    commonName: String,
    botanicalName: String,
    daysToHarvest: Number,
    imgURLs: [String],
    wikiURL: String,
    iconURL: String
});
const bedPositionSchema = mongoose.Schema({
    occupied: Boolean,
    type: plantSchema,
    startDate: {type: Date, default: Date.now},
    harvestDate: Date
});
const contactSchema = mongoose.Schema({
    phoneNumber: String,
    email: String,
    address: String
});
const mediaSchema = mongoose.Schema({
    title: String,
    type: String,
    URL: String,
    notes: String
});
const soilLogSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    action: String
});
const notificationSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    message: String
});
const gardenbedsSchema = mongoose.Schema({
    bedNumber: {type: String, required: true, unique: true},
    owner: {type: String, required: true},
    contact: contactSchema,
    length: Number,
    width: Number,
    bedPositions: [[bedPositionSchema]],
    dateAcquired: Date,
    notes: [notesSchema],
    media: [mediaSchema],
    soilLog: [soilLogSchema],
    notifications: [notificationSchema]
});

gardenbedsSchema.methods.serialize = function() {
    return {
        id: this._id,
        bedNumber: this.bedNumber,
        owner: this.owner
    }
}





console.log("model.js creating GardenManager");
const Beds = mongoose.model('beds', gardenbedsSchema);











module.exports = {Beds};