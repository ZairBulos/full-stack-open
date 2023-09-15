import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import { findAll, create, update, remove } from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState();
  const [filter, setFilter] = useState('');

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
    const newPersons = await findAll();
    setPersons(newPersons);
  };

  const createPerson = async (person) => {
    const newPerson = await create(person);

    const newPersons = [...persons, newPerson];
    setPersons(newPersons);

    handleMessage(`Added ${person.name}`);
  };

  const updatePerson = async (id, person) => {
    const newPerson = await update(id, person);

    const newPersons = persons.map(p => p.id !== id ? p : newPerson);
    setPersons(newPersons);

    handleMessage(`Updated ${person.name}`);
  };

  const removePerson = async (id) => {
    if (window.confirm('¿Delete?')) {
      await remove(id);

      const newPersons = persons.filter(p => p.id !== id);
      setPersons(newPersons);

      handleMessage('Deleted person');
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(undefined)
    }, 5000);
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={message} />
        <Filter
          filter={filter}
          handleFilter={handleFilter}
        />

        <h3>Add a new</h3>
        <PersonForm
          persons={persons}
          createPerson={createPerson}
          updatePerson={updatePerson}
        />

        <h2>Numbers</h2>
        <Persons
          persons={filteredPersons}
          removePerson={removePerson}
        />
      </div>
    </>
  );
}

export default App;