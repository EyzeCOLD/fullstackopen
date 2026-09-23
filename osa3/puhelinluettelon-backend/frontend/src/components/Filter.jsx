const Filter = ({ nameFilter, setNameFilter }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input
        value={nameFilter}
        onChange={(event) => setNameFilter(event.target.value)}
      />
    </div>
  );
};

export default Filter;
