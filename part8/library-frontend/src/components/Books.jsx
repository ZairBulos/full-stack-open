import { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

function Books({ show }) {
  const result = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('all');
  const [booksByGenre, genreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks);
    }
  }, [genreResult.data]);

  if (!show) {
    return null;
  }

  if (result.loading || genreResult.loading) {
    return <div>Loading...</div>
  }

  const { allBooks } = result.data;
  const genres = [...new Set(allBooks.flatMap((b) => b.genres))].concat('all');

  const handleGenre = (genre) => {
    setGenre(genre);

    if (genre === "all") {
      setBooks(allBooks);
      return;
    }

    booksByGenre({ variables: { genre: genre } });
  };

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genre}</b></p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre =>
          <button key={genre} onClick={() => handleGenre(genre)}>
            {genre}
          </button>
        )}
      </div>
    </div>
  );
}

export default Books