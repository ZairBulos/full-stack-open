import { useQuery } from '@apollo/client';
import { ALL_BOOKS, USER } from '../queries';

function Recommended({ show }) {
  const user = useQuery(USER);
  const books = useQuery(ALL_BOOKS);

  if (user.loading || books.loading) {
    return <div>Loading...</div>
  }

  if (!show) {
    return null;
  }

  const genre = user.data.me.favoriteGenre;
  const recommendations = books.data.allBooks.filter(b => b.genres.includes(genre));
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b></b></p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Recommended;