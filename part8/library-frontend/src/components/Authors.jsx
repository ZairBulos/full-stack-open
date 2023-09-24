import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import BirtyearForm from './BirthyearForm';

function Authors({ show }) {
  const result = useQuery(ALL_AUTHORS);

  if (!show) return null;

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map(author =>
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <BirtyearForm authors={result.data.allAuthors} />
    </div>
  );
}

export default Authors;