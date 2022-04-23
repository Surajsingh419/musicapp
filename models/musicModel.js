const mongoose = require('mongoose');
const Mp3Schema = new mongoose.Schema({
    Mp3file: {
        type: String,
        required: true,
        trim: true
    },
  
    Category: {
        type: String,
        required: true,
        trim: true
    },
    Artist: {
        type: String,
        required: true,
        trim: true
    },
   genre : {
    type: String,
    required: true,
    trim: true
   }
}, { timestamps: true });

module.exports = mongoose.model('Mp3', Mp3Schema)