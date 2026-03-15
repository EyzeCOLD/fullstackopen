const Persons = ({ persons, nameFilter }) => {
  return (
    <>
      {persons
        .filter((p) =>
          p.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()),
        )
        .map((p, i) => (
          <p key={i}>
            {p.name} {p.number}
          </p>
        ))}
    </>
  );
};

export default Persons;
