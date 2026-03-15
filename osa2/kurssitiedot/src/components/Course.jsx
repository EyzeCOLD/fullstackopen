import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  console.log("Course:", "course:", course);
  return (
    <>
      <Header text={course.name} />
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
