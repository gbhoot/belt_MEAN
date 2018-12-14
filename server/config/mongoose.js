var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');

module.exports = mongoose;