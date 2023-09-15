function Course(props) {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
}

function Header(props) {
  return (
    <h2>
      {props.course}
    </h2>
  );
}

function Content(props) {
  return (
    <div>
      {props.parts.map(content =>
        <Part content={content} key={content.id} />
      )}
    </div>
  );
}

function Part(props) {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  );
}

function Total(props) {
  const total = props.parts.reduce((s, p) => {
    return s += p.exercises
  }, 0);

  return (
    <p>
      <b>
        total of exercises {total}
      </b>
    </p>
  );
}

function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course course={course} key={course.id} />  
      )}
    </>
  );
}

export default App;