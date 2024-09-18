// Create web server

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Data
const comments = [
    { id: 1, comment: 'Hello World' },
    { id: 2, comment: 'Nice to meet you' }
]

// Routes
app.get('/comments', (req, res) => {
    res.send(comments);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    res.send(comment);
});

app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});

app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');

    comment.comment = req.body.comment;
    res.send(comment);
});

app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);

    res.send(comment);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Run server
// node comments.js
// Open browser and type http://localhost:3000/comments

// Test API using Postman
// GET http://localhost:3000/comments
// POST http://localhost:3000/comments
// PUT http://localhost:3000/comments/1
// DELETE http://localhost:3000/comments/1
// GET http://localhost:3000/comments/1
// GET http://localhost:3000/comments/2
// GET http://localhost:3000/comments