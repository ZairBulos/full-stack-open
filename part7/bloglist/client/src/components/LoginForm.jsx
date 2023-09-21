import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logUserIn } from '../reducers/loginReducer';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useField('text');
  const password = useField('password');

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(logUserIn(username.value, password.value));

    username.onReset();
    password.onReset();

    navigate('/')
  };

  return (
    <Container>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control {...username} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Log In
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;