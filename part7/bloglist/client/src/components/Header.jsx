import { Link } from 'react-router-dom';
import { logUserOut } from '../reducers/loginReducer';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logUserOut());
  };

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to='/'>blog</Nav.Link>
          <Nav.Link as={Link} to='/users'>users</Nav.Link>
          {user
            ? 
            <span className='d-flex align-items-center'>
              {user.name} logged in
              <Button onClick={handleLogout} size='sm' variant='secondary' className='ms-2'>
                log out
              </Button>
            </span>
            : 
            <Nav.Link as={Link} to='/login'>login</Nav.Link>
          }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;