import { useState, useEffect, useRef } from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import PersonService from "./services/people";
import Notification from "./components/Notification";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    isError: false,
  });
  const notificationTimeout = useRef(null);

  const updateList = () => {
    PersonService.getAll().then((res) => {
      console.log("updateList:", res);
      setPeople(res);
    });
  };

  useEffect(() => updateList(), []);

  const newNotification = (message, isError) => {
    console.log("newNotification:", message);
    setNotification({ message: message, isError: isError });

    if (notificationTimeout.current) {
      clearTimeout(notificationTimeout.current);
    }

    notificationTimeout.current = setTimeout(
      (prev) => setNotification({ ...prev, message: "" }),
      5000,
    );
  };

  const updateNumber = (id, newPerson) => {
    PersonService.update(id, newPerson)
      .then((res) => {
        newNotification(`Updated phone number of  '${res.name}'`, false);
        setPeople((prev) => prev.map((p) => (p.name === res.name ? res : p)));
      })
      .catch((error) => newNotification(`${error}`, true));
  };

  const addNewPerson = (newPerson) => {
    PersonService.create(newPerson)
      .then((res) => {
        newNotification(`Added '${res.name}' to the phonebook`, false);
        setPeople((prev) => prev.concat(res));
      })
      .catch((error) => newNotification(`${error}`, true));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phoneNumber: newNumber,
    };

    if (newPerson.name.trim() == "") {
      return newNotification("You must give a name", true);
    }
    if (newPerson.phoneNumber.trim() == "") {
      return newNotification("You must give a phone number", true);
    }
    setNewName("");
    setNewNumber("");

    const found = people.find(
      (p) => p.name.toLocaleUpperCase() === newPerson.name.toLocaleUpperCase(),
    );
    if (found) {
      if (window.confirm(`Update the phonenumber of '${newPerson.name}'?`)) {
        updateNumber(found.id, newPerson);
      }
    } else {
      addNewPerson(newPerson);
    }
  };

  const handleDelete = (person) => {
    console.log("handleDelete:", person);
    if (window.confirm(`Delete ${person.name} from the phonebook?`)) {
      PersonService.deletePerson(person.id)
        .then(() => {
          newNotification(`'${person.name}' deleted from the phonebook`, false);
          setPeople((prev) => prev.filter((p) => p.id != person.id));
        })
        .catch((error) => {
          newNotification(`${error}`, true);
          updateList();
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notification.message}
        isError={notification.isError}
      />
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
      <People
        people={people}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
