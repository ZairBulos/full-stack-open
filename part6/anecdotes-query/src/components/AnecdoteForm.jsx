import { useNotification } from "../contexts/NotificationContext";

function AnecdoteForm({ newAnecdoteMutation }) {
  const { setNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });

    setNotification(`A new anecdote '${content}' added`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;