// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory data store
const commentsByPostId = {};

// GET /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// POST /posts/:id/comments
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Add comment to post
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  // Send comment back
  res.status(201).send(comments);
});

// Start server
app.listen(4001, () => {
  console.log('Listening on port 4001');
});