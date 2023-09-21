import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function Comments({ blog }) {
  const dispatch = useDispatch();
  const comment = useField('text');

  const handleComment = (event) => {
    event.preventDefault();

    dispatch(addComment(blog.id, comment.value));
  };

  return (
    <>
      <h3>comments</h3>
      <Form onSubmit={handleComment}>
        <InputGroup className='mb-3'>
          <Form.Control
            {...comment}
          />
          <Button type='submit' variant='secondary'>
            add comment
          </Button>
        </InputGroup>
      </Form>
      <ul>
        {blog.comments.map((comment, idx) =>
          <li key={idx}>
            {comment}
          </li>
        )}
      </ul>
    </>
  );
}

export default Comments;