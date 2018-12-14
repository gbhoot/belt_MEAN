var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators'),
    ReviewSchema = require('./review.js').schema;

var MovieSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Please enter a movie title"], 
        minlength: [3, "Tiel should contain at least 3 characters"]},
    reviews: {type: [String], required: [true, "Please include a review"]}
}, {timestamps: true});

var Movies = mongoose.model('Movie', MovieSchema);

module.exports = Movies;