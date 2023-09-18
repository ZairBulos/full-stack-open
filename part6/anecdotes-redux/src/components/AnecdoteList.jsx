import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAnecdotes } from '../reducers/anecdoteReducer';

import Anecdote from './Anecdote';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes;
    }

    return anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const sortedAnecdotes = [...anecdotes];
  sortedAnecdotes.sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />
      )}
    </div>
  );
}

export default AnecdoteList;