const config = require('../utils/config');
const helper = require('./test_helper');
const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

// GET
describe('Get blogs information', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const contents = response.body.map(r => r.title);
    expect(contents).toContain(
      'React patterns'
    );
  });

  test('identifying field is named id', async () => {
    const blogsInDb = await helper.blogsInDb();

    blogsInDb.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });
});

// POST
describe('Adding a blog', () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    return (token = jwt.sign(userForToken, config.SECRET));
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Java patterns",
      author: "James Gosling",
      url: "https://javapatterns.com/",
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(b => b.title);
    expect(contents).toContain(
      'Java patterns'
    );
  });

  test('if blog is added without likes property, zero will be assumed', async () => {
    const newBlog = {
      title: "Java patterns",
      author: "James Gosling",
      url: "https://javapatterns.com/",
    };

    const response = await api
      .post('/api/blogs')
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('if blog is added with no url or title it will not be added', async () => {
    const newBlog = {
      author: "James Gosling",
      likes: 5
    };

    await api
      .post('/api/blogs')
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

// PUT
describe('Updating a blog', () => {
  test('a blog with an invalid id returns 400', async () => {
    await api
      .put(`/api/blogs/50`)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    blogToUpdate.likes = 20;

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(response.body.likes).toBe(20);
  });
});

// DELETE
describe('Deleting a blog', () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    token = jwt.sign(userForToken, config.SECRET);

    const newBlog = {
      title: "some blog",
      author: "some author",
      url: "https://www.example.com",
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    return token;
  });

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user');
    const blogToDelete = blogsAtStart[0];
    console.log(`blogToDelete ${blogToDelete}`)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await Blog.find({}).populate('user');
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('fails with status code 401 if user is not authorized', async () => {
    const blogsAtStart = await Blog.find({}).populate('user');
    const blogToDelete = blogsAtStart[0];

    const badToken = null;

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${badToken}`)
      .expect(401);

    const blogsAtEnd = await Blog.find({}).populate('user');

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    expect(blogsAtStart).toEqual(blogsAtEnd);
  });
});

afterAll(() => {
  mongoose.connection.close();
});