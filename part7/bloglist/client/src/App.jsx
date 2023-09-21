import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';

import Blog from './components/Blog';
import User from './components/User';
import Header from './components/Header';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeUsers } from './reducers/userReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeLogin } from './reducers/loginReducer';

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users);

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <>
      <Header />

      <Container>
        <h1>blog app</h1>
        <Notification />
      </Container>

      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/new-blog' element={<BlogForm />} />
        <Route path='/users/:id' element={<User user={user} />} />
        <Route path='/users' element={<UserList users={users} />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} />} />
        <Route path='/' element={<BlogList blogs={blogs} />} />
      </Routes>
    </>
  );
}

export default App;