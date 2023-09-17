import { useState, useEffect, useRef } from 'react';

import './index.css';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

function App() {
  const [blogs, setBlogs] = useState([]);
  const sortedBlogs = [...blogs];
  sortedBlogs.sort((a, b) => b.likes - a.likes);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      handleMessage('wrong username or password');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    const newBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(newBlog));

    handleMessage(`a new blog ${blogObject.title} added`);
  };

  const addLikes = async (blogObject) => {
    const updatedBlog = await blogService.update(
      blogObject.id,
      blogObject
    );
    setBlogs(blogs.map(blog =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    ));
  };

  const removeBlog = async (id) => {
    await blogService.remove(id);
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h1>Blog App</h1>

      {!user &&
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      }

      <Notification message={message} />

      {user &&
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>log out</button>
          </p>

          <Togglable buttonLabel='new blog' ref={blogFormRef} >
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {sortedBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updatedBlog={addLikes}
              deleteBlog={removeBlog}
            />
          )}
        </div>
      }
    </div>
  );
}

export default App;