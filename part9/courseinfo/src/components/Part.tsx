import { CoursePart } from "../types";
import { assertNever } from "../utils/utils";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
    case 'Using props to pass data':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
    case 'Deeper type usage':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
        </p>
      );
    case 'Another Course Part':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.level}
        </p>
      );
    default:
      assertNever(part);
  }
};

export default Part;