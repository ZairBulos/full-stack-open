import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

function App() {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}

export default App;