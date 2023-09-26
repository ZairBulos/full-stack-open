interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Total: React.FC<{ parts: ContentProps[] }> = ({ parts }) => {
  const total = parts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <p>
      Number of exercises{" "}
      {total}
    </p>
  );
}

export default Total;