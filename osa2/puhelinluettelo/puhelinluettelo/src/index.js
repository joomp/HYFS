import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Ronald Reagan', number: '645-456-4568' },
    { name: 'Jimmy Carter', number: '684-43-846' },
    { name: 'Gerald Ford', number: '8468-43-456' },
    { name: 'Richard Nixon', number: '845-43-456' },
    { name: 'Lyndon B. Johnson', number: '132-43-2234' },
    { name: 'John F. Kennedy', number: '923-43-865' },
    { name: 'Dwight D. Eisenhower', number: '113-43-244228' },
    { name: 'Harry S. Trumanv', number: '789-84-234345' },
    { name: 'Franklin D. Roosevelt', number: '452-65-978975' },
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filterer, setFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if( persons.some(person => person.name === newName) ){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNum}))
    }
    setNewName('')
    setNewNum('')
  } 

  const contactsToShow = () => {
    let regexp = new RegExp(filterer, "i");
    return persons.filter(person => regexp.test(person.name))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter contacts</h3>
      <Filter filterer = {filterer} setFilter = {setFilter}/>
      <h3>Add new contact</h3>
      <PersonForm newName = {newName} setNewName = {setNewName} newNum = {newNum} 
       setNewNum = {setNewNum} addName = {addName}/>
      <h2>Numbers</h2>
      <Contacts contacts = {contactsToShow()}/>
    </div>
  )
}

const PersonForm = ({newName, setNewName, newNum, setNewNum, addName}) => {

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumChange = (event) =>{
    setNewNum(event.target.value)
  }

  return(
  <form onSubmit = {addName}>
    <div>
      Name: <input value = {newName} onChange = {handleNameChange}/>
    </div>
    <div>
      Number: <input value = {newNum} onChange = {handleNumChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Contacts = ({contacts}) => {
  return (
    <ul>
      {contacts.map((person) => {
        return <Contact key = {person.name + person.number} person = {person}/>
      })}
    </ul>
  )
}

const Filter = ({filterer, setFilter}) => {
  
  const handleFiltererChange = (event) =>{
    setFilter(event.target.value)
  }

  return (
    <form>
      <div>
        Search: <input value = {filterer} onChange = {handleFiltererChange}/>
      </div>
    </form>
  )
}

const Contact = ({person}) => {
  return <li key = {person.name + person.number}> {`${person.name}, ${person.number}`} </li>
}


ReactDOM.render(<App />, document.getElementById('root')
);
