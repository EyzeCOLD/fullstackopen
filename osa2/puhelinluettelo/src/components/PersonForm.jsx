const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleSubmit,
}) => {
  return (
    <form>
      <div>
        Name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
      </div>
      <div>
        <button onClick={handleSubmit} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
