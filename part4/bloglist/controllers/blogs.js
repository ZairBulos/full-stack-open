const blogsRouter = require('express').Router();
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;

  const token = req.token;
  const user = req.user;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token missing or invalid'
    });
  }

  if (!body.title || !body.url) {
    res.status(400).json({ error: 'properties missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const blog = {
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    blog,
    { new: true }
  );
  return res.status(201).json(updatedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token;
  const user = req.user;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!(token && decodedToken.id)) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(req.params.id);

  if (blogToDelete.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).end();
  }
});

module.exports = blogsRouter;