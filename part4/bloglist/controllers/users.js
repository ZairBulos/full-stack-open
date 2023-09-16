const bcrypt = require('bcrypt');
const User = require('../models/user');
const usersRouter = require('express').Router();

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', {url: 1, title: 1, author: 1} );
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if (body.username.length < 3 || body.username.length < 3) {
    res.status(400).json({ error: 'Username and/or Password not long enough' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;