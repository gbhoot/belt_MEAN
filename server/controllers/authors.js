var Author = require('../models/author.js');

module.exports = {
    getAll: function(req, res) {
        Author.find({}, function(error, authors) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    authors: authors
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let aid = req.params.id;
        Author.findOne({_id: aid}, function(error, author) {
            if (error || author.length == 0) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    author: author
                };
                res.json(response);
            };
        });
    },

    create: function(req, res) {
        let inc_author = req.body;
        let author = new Author(inc_author);
        author.save(function(error, new_author) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    author: author
                };
                res.json(response);
            };
        });
    },

    update: function(req, res) {
        let inc_author = req.body;
        let aid = req.params.id;
        let opts = { runValidators: true };
        Author.updateOne({_id: aid}, inc_author, opts, function(error, author) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    author: author
                };
                res.json(response);
            }
        });
    },

    destroyAll: function(req, res) {
        Author.deleteMany({}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    destroyOne: function(req, res) {
        let aid = req.params.id;
        Author.deleteOne({_id: aid}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                };
                res.json(response);
            };
        });
    }
}