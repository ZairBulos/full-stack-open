import { useState } from "react";

function Button(props) {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
}

function AnectodeMostVote(props) {
  const max = Math.max(...props.votes);
  const position = props.votes.indexOf(max);
  const anecdote = props.anecdotes[position];

  return (
    <>
      {
        max === 0
          ? <p>No vote yet</p>
          : <>
            <p>{anecdote}</p>
            <p>has {max} votes</p>
          </>
      }
    </>
  );
}

function App(props) {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  const handleAnecdote = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <>
      <div>
        <h1>Anectode of the day</h1>
        <p>
          {props.anecdotes[selected]}
        </p>
        <p>has {votes[selected]} votes</p>

        <Button text="vote" handleClick={handleVote} />
        <Button text="next anecdote" handleClick={handleAnecdote} />
      </div>

      <div>
        <h1>Anectode with most votes</h1>
        <AnectodeMostVote votes={votes} anecdotes={props.anecdotes} />
      </div>
    </>
  )
}

export default App;