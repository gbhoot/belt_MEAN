var mongoose = require('../config/mongoose.js');

var ReviewSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Please input your name"], 
        minlength: [3, "Name should contain at least 3 characters"]},
    rating: {type: Number, default: 1},
    review: {type: String, required: [true, "Please input your review of the movie"], 
        minlength: [3, "Review should contain at least 3 characters"]}
}, {timestamps: true});

var Reviews = mongoose.model('Review', ReviewSchema);

module.exports = Reviews;