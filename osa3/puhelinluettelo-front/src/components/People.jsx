const Persons = ({ people, nameFilter, handleDelete }) => {
  if (!people.length) {
    return <div>No contacts added.</div>;
  }

  const matching = people
    .filter((p) =>
      p.name.toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()),
    )
    .map((p, i) => (
      <tr key={i}>
        <td>{p.name}</td>
        <td>{p.phoneNumber}</td>
        <td>
          <button onClick={() => handleDelete(p)}>delete</button>
        </td>
      </tr>
    ));

  if (matching.length == 0) {
    return <div>No matching contacts found.</div>;
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
      <tbody>{matching}</tbody>
    </table>
  );
};

export default Persons;
