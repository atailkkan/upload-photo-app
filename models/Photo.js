const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
let photoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

let Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;