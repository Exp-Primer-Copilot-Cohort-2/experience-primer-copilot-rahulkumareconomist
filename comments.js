```
// create web server
```
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./comment');

// connect to database
mongoose.connect('mongodb://localhost/comments');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// on routes that end in /comments
// ----------------------------------------------------
router.route('/comments')

    // create a comment (accessed at POST http://localhost:8080/api/comments)
    .post(function(req, res) {

        var comment = new Comment();      // create a new instance of the Comment model
        comment.name = req.body.name;  // set the comments name (comes from the request)
        comment.comment = req.body.comment;  // set the comments comment (comes from the request)

        // save the comment and check for errors
        comment.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment created!' });
        });

    })

    // get all the comments (accessed at GET http://localhost:8080/api/comments)
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);

            res.json(comments);
        });
    });

// on routes that end in /comments/:comment_id
// ----------------------------------------------------
router.route('/comments/:comment_id')

    // get the comment with that id (accessed at GET http://localhost:8080/api/comments/:comment_id)
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)