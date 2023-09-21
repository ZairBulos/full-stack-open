import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function BlogForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    };

    title.onReset();
    author.onReset();
    url.onReset();

    dispatch(createBlog(blog));
    dispatch(setNotification(`a new blog '${blog.title}' added`, 5));

    navigate('/');
  };

  return (
    <Container>
      <h2>create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control {...title} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='author'>
          <Form.Label>Author</Form.Label>
          <Form.Control {...author} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='url'>
          <Form.Label>Url</Form.Label>
          <Form.Control {...url} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Create
        </Button>
      </Form>
    </Container>
  );
}

export default BlogForm;