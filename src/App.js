import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearchTerm, setNewSearchTerm] = useState("");

  const hook = () => {
    phoneService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  };

  useEffect(hook, []);

  const personsToShow =
    newSearchTerm.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(newSearchTerm.toLowerCase())
        )
      : persons;

  const addContact = (event) => {
    event.preventDefault();
    let isDuplicate = false;

    persons.forEach((person) => {
      if (person.name === newName) isDuplicate = true;
    });

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook.`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      phoneService.create(newPerson).then( (person) => persons.concat(person));
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setNewSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newSearchTerm={newSearchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addName={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
