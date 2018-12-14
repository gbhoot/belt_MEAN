var Movie = require('../models/movie.js'),
    Review = require('../models/review.js');

module.exports = {
    getAll: function(req, res) {
        Movie.find({}, function(error, movies) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    movies: movies
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let mid = req.params.id;
        Movie.findOne({_id: mid}, function(error, movie) {
            if (error || movie.length == 0) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    movie: movie
                };
                res.json(response);
            };
        });
    },

    create: function(req, res) {
        let inc_movie = req.body['movie'];
        let inc_review = req.body['review'];
        let review = new Review(inc_review);
        review.save(function(error, new_review) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            }
            else {
                inc_movie['reviews'] = review._id
                let movie = new Movie(inc_movie);
                movie.save(function(error, new_movie) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        let response = {
                            message: "Success",
                            movie: movie
                        };
                        res.json(response);
                    };
                });
            }
        });
    },

    update: function(req, res) {
        let inc_movie = req.body;
        let mid = req.params.id;
        let opts = { runValidators: true };
        Movie.updateOne({_id: mid}, inc_movie, opts, function(error, movie) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    movie: movie
                };
                res.json(response);
            }
        });
    },

    destroyAll: function(req, res) {
        Movie.deleteMany({}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Review.deleteMany({}, function(error) {
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
            };
        });
    },

    destroyOne: function(req, res) {
        let mid = req.params.id;
        Movie.findOne({_id: mid}, function(error, movie) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let reviewsList = movie['reviews'];
                Review.deleteMany({_id: {$in: reviewsList}}, function(error) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        Movie.deleteOne({_id: mid}, function(error) {
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
                    };
                });
            };
        });
    }
}