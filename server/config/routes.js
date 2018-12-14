var path = require('path'),
    authors = require('../controllers/authors.js'),
    quotes = require('../controllers/quotes.js');

module.exports = function(app) {
    // Get all the authors
    app.get('/db/v1/authors', function(req, res) {
        authors.getAll(req, res);
    });

    // Get one author via id
    app.get('/db/v1/authors/:id', function(req, res) {
        authors.getOne(req, res);
    });

    // Create new author
    app.post('/db/v1/authors', function(req, res) {
        authors.create(req, res);
    });

    // Update author via id
    app.put('/db/v1/authors/:id', function(req, res) {
        authors.update(req, res);
    });

    // Remove all authors
    app.delete('/db/v1/authors', function(req, res) {
        authors.destroyAll(req, res);
    });

    // Remove one author via id
    app.delete('/db/v1/authors/:id', function(req, res) {
        authors.destroyOne(req, res);
    });

    // Get all quotes
    app.get('/db/v1/quotes', function(req, res) {
        quotes.getAll(req, res);
    });

    // Get one quote via id
    app.get('/db/v1/quotes/:id', function(req, res) {
        quotes.getOne(req, res);
    });

    // Create a quote for specific author
    app.post('/db/v1/authors/:id/quotes', function(req, res) {
        quotes.create(req, res);
    });

    // Update a quote for specific author (Vote up/down)
    app.put('/db/v1/authors/:aid/quotes/:qid', function(req, res) {
        quotes.update(req, res);
    });

    // Delete all quotes
    app.delete('/db/v1/quotes', function(req, res) {
        quotes.destroyAll(req, res);
    });

    // Delete one quote via id
    app.delete('/db/v1/quotes/:id', function(req, res) {
        quotes.destroyOne(req, res);
    });

    // Delete one quote for specific author
    app.delete('/db/v1/authors/:aid/quotes/:qid', function(req, res) {
        quotes.destroyOneForAuthor(req, res);
    });

    // Remaining routes direct to Angular
    app.all("**", function(req, res, next) {
        res.sendFile(path.resolve(__dirname, '../../public/dist/public/index.html'));
    });
}