var Quote = require('../models/quote.js'),
    Author = require('../models/author.js');

module.exports = {
    getAll: function(req, res) {
        Quote.find({}, function(error, quotes) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    quotes: quotes
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let qid = req.params.id;
        Quote.findOne({_id: qid}, function(error, quote) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    quote: quote
                };
                let repsonse = {
                    message: "Success",
                    quote: quote
                };
            };
        });
    },

    create: function(req, res) {
        let aid = req.params.id;
        let inc_quote = req.body;
        let quote = new Quote(inc_quote);
        quote.save(function(error, new_quote) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Author.updateOne({_id: aid}, {$push: {quotes: quote}}, function(error, author) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        let response = {
                            message: "Success",
                            quote: quote,
                            author: author
                        };
                        res.json(response);
                    };
                });
            };
        });
    },

    update: function(req, res) {
        let aid = req.params['aid'];
        let qid = req.params['qid'];
        let inc = Number(req.body['inc']);
        Quote.update({_id: qid}, {$inc: {votes: inc}}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Quote.find({_id: qid}, function(error, quote) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        res.json(error);
                    } else {
                        Author.update({_id: aid}, {$pull: {quotes: {_id: qid}}}, function(error) {
                            if (error) {
                                console.log("There was an issue: ", error);
                                res.json(error);
                            } else {
                                Author.update({_id: aid}, {$push: {quotes: quote}}, function(error) {
                                    if (error) {
                                        console.log("There was an issue: ", error);
                                        res.json(error);
                                    } else {
                                        let response = {
                                            message: "Success"
                                        };
                                        res.json(response);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    destroyAll: function(req, res) {
        Quote.deleteMany({}, function(error) {
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
        let qid = req.params.id;
        Quote.deleteOne({_id: qid}, function(error) {
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

    destroyOneForAuthor: function(req, res) {
        let aid = req.params['aid'];
        let qid = req.params['qid'];
        Quote.deleteOne({_id: qid}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Author.update({_id: aid}, {$pull: {quotes: {_id: qid}}}, function(error) {
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