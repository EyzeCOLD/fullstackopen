const Total = ({ parts }) => {
  console.log("Total: parts:", parts);

  const getTotal = () => parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <b>Total of {getTotal()} exercises</b>
    </>
  );
};

export default Total;
