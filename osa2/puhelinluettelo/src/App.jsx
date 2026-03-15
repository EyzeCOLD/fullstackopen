import { useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const nName = newName;
    const nNumber = newNumber;
    if (nName.trim() == "") {
      alert("You must give a name");
      return;
    }
    if (nNumber.trim() == "") {
      alert("You must give a phone number");
      return;
    }
    setNewName("");
    setNewNumber("");
    if (persons.find((p) => p.name === nName)) {
      alert(`${nName} is already added to phonebook`);
      return;
    }
    return setPersons((p) => {
      console.log("onClick:", p);
      return p.concat({ name: nName, number: nNumber });
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
