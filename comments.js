// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Use body parser
app.use(bodyParser.json());
app.use(cors());

// Create comments variable
const commentsByPostId = {};

// Create route for comments
app.get('/posts/:id/comments', (req, res) => {
  // Send back comments of post
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route for comments
app.post('/posts/:id/comments', (req, res) => {
  // Create random id
  const commentId = randomBytes(4).toString('hex');
  // Get content from request body
  const { content } = req.body;
  // Get comments for post
  const comments = commentsByPostId[req.params.id] || [];
  // Push new comment to comments array
  comments.push({ id: commentId, content });
  // Set comments for post
  commentsByPostId[req.params.id] = comments;
  // Send back comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});