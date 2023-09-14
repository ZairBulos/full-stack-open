function Header(props) {
  return (
    <h1>
      {props.course}
    </h1>
  );
}

function Part(props) {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  );
}

function Content(props) {
  return (
    <div>
      <Part content={props.content[0]} />
      <Part content={props.content[1]} />
      <Part content={props.content[2]} />
    </div>
  );
}

function Total(props) {
  return (
    <p>Number of exercises {props.total}</p>
  );
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  };

  const calculateTotal = () => {
    return course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={calculateTotal()} />
    </div>
  );
}

export default App;