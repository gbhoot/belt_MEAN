var path = require('path'),
    movies = require('../controllers/movies.js'),
    reviews = require('../controllers/reviews.js');

module.exports = function(app) {
    app.get('', function(req, res) {
        res.redirect('/movies');
    });

    // Get all the movies
    app.get('/db/v1/movies', function(req, res) {
        movies.getAll(req, res);
    });

    // Get one movie via id
    app.get('/db/v1/movies/:id', function(req, res) {
        movies.getOne(req, res);
    });

    // Create new movie
    app.post('/db/v1/movies', function(req, res) {
        movies.create(req, res);
    });

    // Update movie via id
    // app.put('/db/v1/movies/:id', function(req, res) {
    //     movies.update(req, res);
    // });

    // Remove all movies
    app.delete('/db/v1/movies', function(req, res) {
        movies.destroyAll(req, res);
    });

    // Remove one movie via id
    app.delete('/db/v1/movies/:id', function(req, res) {
        movies.destroyOne(req, res);
    });

    // Get all reviews
    app.get('/db/v1/reviews', function(req, res) {
        reviews.getAll(req, res);
    });

    // Get all reviews for specific movie
    app.get('/db/v1/movies/:id/reviews', function(req, res) {
        reviews.getAllForMovie(req, res);
    });

    // Create first review
    app.post('/db/v1/reviews', function(req, res) {
        reviews.createFirst(req, res);
    });

    // Get one review via id
    app.get('/db/v1/reviews/:id', function(req, res) {
        reviews.getOne(req, res);
    });

    // Create a review for specific movie
    app.post('/db/v1/movies/:id/reviews', function(req, res) {
        reviews.create(req, res);
    });

    // Update a review for specific movie
    // app.put('/db/v1/movies/:aid/reviews/:qid', function(req, res) {
    //     reviews.update(req, res);
    // });

    // Delete all reviews
    app.delete('/db/v1/reviews', function(req, res) {
        reviews.destroyAll(req, res);
    });

    // Delete one review via id
    app.delete('/db/v1/reviews/:id', function(req, res) {
        reviews.destroyOne(req, res);
    });

    // Delete one review for specific movie
    app.delete('/db/v1/movies/:mid/reviews/:rid', function(req, res) {
        reviews.destroyOneForMovie(req, res);
    });

    // Remaining routes direct to Angular
    app.all("**", function(req, res, next) {
        res.sendFile(path.resolve(__dirname, '../../public/dist/public/index.html'));
    });
}