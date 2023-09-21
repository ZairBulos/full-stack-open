import Container from 'react-bootstrap/Container';

function User({ user }) {
  return (
    <Container>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </Container>
  );
}

export default User;