var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies');

module.exports = mongoose;