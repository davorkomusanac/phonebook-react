import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Person from "./components/Persons";
import phoneService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearchTerm, setNewSearchTerm] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    isErrorNotification: false,
  });

  //Get initial notes from server
  useEffect(() => {
    phoneService.getAllContacts().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  //Filter search results
  const personsToShow =
    newSearchTerm.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(newSearchTerm.toLowerCase())
        )
      : persons;

  //Add the person with the phone number to the server
  const addContact = (event) => {
    event.preventDefault();
    let isDuplicate = false;

    persons.forEach((person) => {
      if (person.name === newName) isDuplicate = true;
    });

    if (isDuplicate) {
      updateContact();
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      phoneService
        .createContact(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName("");
          setNewNumber("");
          setNotification({
            message: `Added ${person.name}`,
            isErrorNotification: false,
          });
          setTimeout(() => {
            setNotification({ message: "", isErrorNotification: false });
          }, 5000);
        })
        .catch((error) => handleErrorPopup(error));
    }
  };

  //Remove contact from server
  const removeContact = (personToBeRemoved) => {
    if (window.confirm(`Delete ${personToBeRemoved.name}`)) {
      phoneService
        .removeContact(personToBeRemoved.id)
        .then((_) => {
          setPersons(
            persons.filter((person) => person.name !== personToBeRemoved.name)
          );
        })
        .catch((error) => handleErrorPopup(error));
    }
  };

  //Update contact number
  const updateContact = () => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const personToBeUpdated = persons.find(
        (person) => person.name === newName
      );
      const updatedPerson = { ...personToBeUpdated, number: newNumber };

      phoneService
        .updateContact(updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.name !== returnedPerson.name ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
          setNotification({
            message: `Updated ${returnedPerson.name}`,
            isErrorNotification: false,
          });
          setTimeout(() => {
            setNotification({ message: "", isErrorNotification: false });
          }, 5000);
        })
        .catch((error) => handleErrorPopup(error));
    }
  };

  const handleErrorPopup = (error) => {
    setNotification({
      message: `There was an error: "${
        error.response.data ? error.response.data.error : error
      }"`,
      isErrorNotification: true,
    });
    setTimeout(() => {
      setNotification({ message: "", isErrorNotification: false });
    }, 5000);
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
      <Notification
        message={notification.message}
        isError={notification.isErrorNotification}
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
      <div>
        {personsToShow.map((person) => (
          <Person
            key={person.name}
            person={person}
            deletePerson={() => removeContact(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
