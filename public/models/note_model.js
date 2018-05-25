'use strict';

const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    content: String
});

const Note = mongoose.model('Note', notesSchema);

module.exports = {Note, notesSchema};
