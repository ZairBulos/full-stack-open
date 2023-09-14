import { useState } from "react";

function Button(props) {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
}

function Statistics(props) {
  const total = props.good + props.neutral + props.bad;
  const average = ((props.good - props.bad) / (props.good + props.bad + props.neutral));
  const positive = ((props.good) / (props.bad + props.good + props.neutral) * 100);

  return (
    <>
      {
        total === 0 ? (
          <p>No feedback given</p>

        ) : (
          <table>
            <tbody>
              <StatisticLine text="good" value={props.good} />
              <StatisticLine text="neutral" value={props.neutral} />
              <StatisticLine text="bad" value={props.bad} />
              <StatisticLine text="all" value={total} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={positive} />
            </tbody>
          </table>
        )
      }
    </>
  );
}

function StatisticLine(props) {
  return (
    <tr key={props.text}>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button text="good" handleClick={handleGoodClick} />
        <Button text="neutral" handleClick={handleNeutralClick} />
        <Button text="bad" handleClick={handleBadClick} />
      </div>

      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  )
}

export default App;