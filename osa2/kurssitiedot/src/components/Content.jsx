import Part from "./Part";

const Content = ({ content }) => {
  console.log("Content: content:", content);
  return (
    <>
      {content.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

export default Content;
