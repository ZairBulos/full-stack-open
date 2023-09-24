import { useEffect, useState } from 'react';
import { UPDATE_BORN } from '../queries';
import { useMutation } from '@apollo/client';

function BirtyearForm({ authors }) {
  const [name, setName] = useState('');
  const [born, setBorn] = useState(0);

  const [error, setError] = useState(null);

  const [changeBorn, result] = useMutation(UPDATE_BORN);

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found');
      setTimeout(() => {
        setError(null);
      }, 5000)
    }
  }, [result.data]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    changeBorn({ variables: { name, setBornTo: parseInt(born) } });
    setName('');
    setBorn(0);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value=""></option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">
          update author
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default BirtyearForm;