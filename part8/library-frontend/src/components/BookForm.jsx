import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, CREATE_BOOK } from '../queries';

function BookForm({ show, updateCache }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(response.data.addBook)
    },
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  });

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published: parseInt(published), genres } });
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          onChange={({ target }) => { setTitle(target.value) }}
        />
      </div>
      <div>
        author
        <input
          type="text"
          onChange={({ target }) => { setAuthor(target.value) }}
        />
      </div>
      <div>
        published
        <input
          type="number"
          onChange={({ target }) => { setPublished(target.value) }}
        />
      </div>
      <div>
        <input
          type="text"
          value={genre}
          onChange={({ target }) => { setGenre(target.value) }}
        />
        <button onClick={addGenre} type="button">add genre</button>
      </div>
      <div>genres: {genres.join(" ")}</div>
      <button onSubmit={handleSubmit} type="submit">
        create book
      </button>
    </form>
  );
}

export default BookForm;