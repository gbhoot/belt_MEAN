var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators'),
    QuoteSchema = require('./quote.js').schema;

var AuthorSchema = new mongoose.Schema({
    fName: {type: String, required: true, minlength: 3},
    lName: {type: String, required: true, minlength: 3},
    quotes: [QuoteSchema]
}, {timestamps: true});

var Authors = mongoose.model('Author', AuthorSchema);

module.exports = Authors;