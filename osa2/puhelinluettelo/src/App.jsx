import { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    PersonService.getAll().then((res) => {
      console.log("useEffect: PersonService.getAll(): response:", res);
      setPersons(res);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (newPerson.name.trim() == "") {
      alert("You must give a name");
      return;
    }
    if (newPerson.number.trim() == "") {
      alert("You must give a phone number");
      return;
    }
    setNewName("");
    setNewNumber("");
    if (persons.find((p) => p.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    PersonService.create(newPerson).then((res) => {
      return setPersons((p) => {
        console.log("onClick:", p);
        return p.concat(res);
      });
    });
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} from the phonebook?`)) {
      setPersons((prev) => prev.filter((p) => p.id != person.id));
      PersonService.deletePerson(person.id);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <br />

      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <br />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
