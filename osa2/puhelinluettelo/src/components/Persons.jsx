const Persons = ({ persons, nameFilter, handleDelete }) => {
  console.log(
    "Persons: persons:",
    persons,
    "nameFilter:",
    nameFilter,
    "handleDelete:",
    handleDelete,
  );
  return (
    <>
      {persons
        .filter((p) =>
          p.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()),
        )
        .map((p, i) => (
          <p key={i}>
            {p.name} {p.number}
            <button
              onClick={() => {
                console.log("onClick:", p.id);
                handleDelete(p);
              }}
            >
              delete
            </button>
          </p>
        ))}
    </>
  );
};

export default Persons;
