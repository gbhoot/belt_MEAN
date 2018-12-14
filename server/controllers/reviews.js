var Review = require('../models/review.js'),
    Movie = require('../models/movie.js');

module.exports = {
    getAll: function(req, res) {
        Review.find({}, function(error, reviews) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    reviews: reviews
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let rid = req.params.id;
        Review.findOne({_id: rid}, function(error, review) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    review: review
                };
                res.json(response)
            };
        });
    },

    getAllForMovie: function(req, res) {
        let mid = req.params.id;
        Movie.find({_id: mid}, function(error, movie) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let reviewsList = movie[0]['reviews'];
                Review.find({_id: {$in: reviewsList}}, function(error, reviews) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        let response = {
                            message: "Success",
                            reviews: reviews
                        };
                        res.json(response);
                    };
                });
            };
        });
    },

    create: function(req, res) {
        let mid = req.params.id;
        let inc_review = req.body;
        let review = new Review(inc_review);
        review.save(function(error, new_review) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Movie.updateOne({_id: mid}, {$push: {reviews: review._id}}, function(error, movie) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        let response = {
                            message: "Success",
                            review: review,
                            movie: movie
                        };
                        res.json(response);
                    };
                });
            };
        });
    },

    createFirst: function(req, res) {
        let inc_review = req.body;
        let review = new Review(inc_review);
        review.save(function(error, new_review) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    review: review
                };
                res.json(response);
            };
        });
    },

    // update: function(req, res) {
    //     let mid = req.params['mid'];
    //     let rid = req.params['rid'];
    //     let inc = Number(req.body['inc']);
    //     Review.update({_id: rid}, {$inc: {votes: inc}}, function(error) {
    //         if (error) {
    //             console.log("There was an issue: ", error);
    //             res.json(error);
    //         } else {
    //             Quote.find({_id: qid}, function(error, quote) {
    //                 if (error) {
    //                     console.log("There was an issue: ", error);
    //                     res.json(error);
    //                 } else {
    //                     Author.update({_id: aid}, {$pull: {quotes: {_id: qid}}}, function(error) {
    //                         if (error) {
    //                             console.log("There was an issue: ", error);
    //                             res.json(error);
    //                         } else {
    //                             Author.update({_id: aid}, {$push: {quotes: quote}}, function(error) {
    //                                 if (error) {
    //                                     console.log("There was an issue: ", error);
    //                                     res.json(error);
    //                                 } else {
    //                                     let response = {
    //                                         message: "Success"
    //                                     };
    //                                     res.json(response);
    //                                 }
    //                             })
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // },

    destroyAll: function(req, res) {
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
    },

    destroyOne: function(req, res) {
        let rid = req.params.id;
        Review.deleteOne({_id: rid}, function(error) {
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

    destroyOneForMovie: function(req, res) {
        let mid = req.params['mid'];
        let rid = req.params['rid'];
        Review.deleteOne({_id: rid}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Movie.update({_id: mid}, {$pull: {reviews:  rid}}, function(error) {
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
    }
}