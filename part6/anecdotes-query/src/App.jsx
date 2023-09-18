import { getAll, create, update } from './requests';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useNotification } from './contexts/NotificationContext';

function App() {
  const { setNotification } = useNotification();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] });
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote));
    }
  });

  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  });
  
  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ 
      ...anecdote,
      votes: anecdote.votes + 1 
    });
    setNotification(`You voted ${anecdote.content}`);
  };

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;