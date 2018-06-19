'use strict';

const mongoose = require('mongoose');

const { Notification } = require('./notifications_model');
const { Note } = require('./note_model');
const { BedPosition } = require('./bedPositions_model');
const { Contact } = require('./contact_model');
const { Media } = require('./media_model');
const { SoilLog } = require('./soilLog_model');


const gardenbedsSchema = mongoose.Schema({
    bedNumber: { type: String, required: true, unique: true },
    owner: { type: String, required: true },
    contact: Contact.prototype.schema,
    length: { type: Number, default: 10 },
    width: { type: Number, default: 5 },
    bedPositions: [[BedPosition.prototype.schema]],
    dateAcquired: { type: Date, required: true , default: Date.now },
    notes: [Note.prototype.schema],
    media: [Media.prototype.schema],
    soilLog: [SoilLog.prototype.schema],
    notifications: [Notification.prototype.schema]
});

gardenbedsSchema.methods.serialize = function () {
    return {
        id: this._id,
        bedNumber: this.bedNumber,
        owner: this.owner,
        notifications: this.notifications,
        bedPositions: this.bedPositions,
        dateAcquired: this.dateAcquired,
        soilLog: this.soilLog,

    };
};

gardenbedsSchema.methods.getAllBedInfo = function () {
    return {
        id: this._id,
        bedNumber: this.bedNumber,
        owner: this.owner,
        contact: this.contact,
        length: this.length,
        width: this.width,
        bedPositions: this.bedPositions,
        dateAcquired: this.dateAcquired,
        notes: this.notes,
        media: this.media,
        soilLog: this.soilLog,
        notifications: this.notifications
    };
};


gardenbedsSchema.methods.getBedPositions = function () {
    return {
        bedPositions: this.bedPositions
    };
};
gardenbedsSchema.methods.getBedNotifications = function () {
    return {
        notifications: this.notifications
    };
};
gardenbedsSchema.methods.getBedNotes = function () {
    return {
        notes: this.notes
    };
};
gardenbedsSchema.methods.getBedMedia = function() {
    return {
        media: this.media
    };
};
gardenbedsSchema.methods.getBedSoilLog = function () {
    return {
        soilLog: this.soilLog
    };
};
gardenbedsSchema.methods.getOwner = function () {
    return {
        owner: this.owner
    };
};

console.log("model.js creating GardenManager");


const Gardenbeds = mongoose.model('gardenbeds', gardenbedsSchema);


module.exports = { Gardenbeds };