import { useState } from "react";

function PersonForm(props) {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const person = props.persons.filter(p => p.name.toLowerCase() === newName.toLowerCase());

        if (person.length !== 0) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                const personToUpdate = { ...person[0], number: newNumber };
                props.updatePerson(personToUpdate.id, personToUpdate);
                cleanValues();
                return;
            } else {
                return;
            }
        }

        const personToAdd = { name: newName, number: newNumber };
        props.createPerson(personToAdd);
        cleanValues();
    };

    const cleanValues = () => {
        setNewName('');
        setNewNumber('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name:
                <input
                    id="name"
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                />
            </div>
            <div>
                number:
                <input
                    id="number"
                    type="text"
                    value={newNumber}
                    onChange={e => setNewNumber(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">
                    add
                </button>
            </div>
        </form>
    );
}

export default PersonForm;