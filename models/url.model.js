
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const shortID = require('shortid')
const nanoID = require('nanoid')
const url_schema = new Schema({
    full:{
        type: String,
        required: true,
        unique: true
    }, short:{
        type: String,
        default: shortID.generate,
        unique: true
    }, clicks:{
        type: Number, 
        default: 0
    }, og:{
        type: Object
    }
})


module.exports = mongoose.model('URL', url_schema)

// Make different meta tags. Fix the length of String.