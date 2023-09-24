import { useState } from 'react';
import { useSubscription, useApolloClient } from '@apollo/client';

import { ALL_BOOKS, BOOK_ADDED } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import BookForm from './components/BookForm';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';

function App() {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      alert(`${addedBook.title} added`);

      updateCacheWith(addedBook);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add-book')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <BookForm show={page === 'add-book'} updateCache={updateCacheWith} />
      <LoginForm show={page === 'login'} setToken={setToken} />
      <Recommended show={page === 'recommend'} />
    </>
  );
}

export default App;