var mongoose = require('../config/mongoose.js');

var QuoteSchema = new mongoose.Schema({
    quote: {type: String, required: true, minlength: 3},
    votes: {type: Number, default: 0}
}, {timestamps: true});

var Quotes = mongoose.model('Quote', QuoteSchema);

module.exports = Quotes;