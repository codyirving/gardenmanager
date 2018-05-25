'use strict';

const mongoose = require('mongoose');

const {notificationSchema} = require('./notifications_model');
const {notesSchema} = require('./note_model');
const {bedPositionSchema} = require('./bedPositions_model');
const {contactSchema} = require('./contact_model');
const {Media} = require('./media_model');
const {soilLogSchema} = require('./soilLog_model');


const gardenbedsSchema = mongoose.Schema({
    bedNumber: {type: String, required: true, unique: true},
    owner: {type: String, required: true},
    contact: contactSchema,
    length: {type: Number, default: 10},
    width: {type: Number, default: 5},
    bedPositions: [[bedPositionSchema]],
    dateAcquired: {type: Date, default: Date.now, required: true},
    notes: [notesSchema],
    media: [Media.prototype.schema],
    soilLog: [soilLogSchema],
    notifications: [notificationSchema]
});

gardenbedsSchema.methods.serialize = function() {
    return {
        id: this._id,
        bedNumber: this.bedNumber,
        owner: this.owner,
        notifications: this.notifications
    }
}



console.log("model.js creating GardenManager");


const Gardenbeds = mongoose.model('gardenbeds', gardenbedsSchema);


module.exports = {Gardenbeds};