const Persons = ({ persons, nameFilter, handleDelete }) => {
  if (!persons.length) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {persons
          .filter((p) =>
            p.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()),
          )
          .map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td>
              <td>{p.number}</td>
              <td>
                <button onClick={() => handleDelete(p)}>delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Persons;
