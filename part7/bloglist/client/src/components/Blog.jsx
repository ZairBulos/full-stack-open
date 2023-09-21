import { useDispatch } from 'react-redux';
import { removeBlog, updateBlog } from '../reducers/blogReducer';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Comments from './Comments';

function Blog({ blog }) {
  const dispatch = useDispatch();

  const handleLike = () => {
    const blogToChange = {
      ...blog,
      likes: blog.likes + 1
    };
    dispatch(updateBlog(blogToChange));
  };

  const handleRemove = () => {
    const { id } = blog;
    dispatch(removeBlog(id));
  };

  return (
    <Container>
      <h2>
        {blog.title}
      </h2>
      <p>
        <a href={blog.url} target='_blank'>
          {blog.url}
        </a>
      </p>
      <p>
        {blog.likes} likes
        <Button onClick={handleLike} size='sm'>
          like
        </Button>
      </p>
      <p>
        added by {blog.user.name}
      </p>
      <Comments blog={blog} />
    </Container>
  );
}

export default Blog;