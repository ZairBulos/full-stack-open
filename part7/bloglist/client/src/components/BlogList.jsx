import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function BlogList({ blogs }) {
  const login = useSelector(state => state.user);

  if (!login) {
    return null
  }

  return (
    <Container>
      <Link to='/new-blog'>
        <Button>
          create new
        </Button>
      </Link>
      
      <Table bordered hover className='mt-3'>
        <tbody>
          {
            blogs.map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default BlogList;