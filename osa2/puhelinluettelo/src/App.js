import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNum, setNewNum ] = useState('')
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)
    const [ filterer, setFilter ] = useState('')
  
    useEffect( () => {
      refreshPersons()
    }, [])
  
    const refreshPersons = () => {
        contactService.getAll()
        .then( response => {
            setPersons(response)
        })
    }

    const addName = (event) => {
        const newContact = {
            name: newName,
            number: newNum
        }

        event.preventDefault()
        if( persons.some(person => person.name === newName) ){
            const message = `${newName} is already in phonebook. Do you want to update their information?`
            const result = window.confirm(message)
            if (!result){
                return
            }
            contactService.update(getID(newName), newContact).then( resp => refreshPersons())
            setNewName('')
            setNewNum('')
            showNotification(`${newContact.name}'s number was changed succesfully`)
            return
        } 
        contactService.create(newContact).then(resp => {
            setNewName('')
            setNewNum('')
            refreshPersons()
            showNotification(`${newContact.name} was added succesfully`)
        })
    } 

    const getID = (name) => persons.find(person => person.name === name ).id

    const showNotification = msg => {
        setNotification(msg)
        setTimeout(() => {
            setNotification(null)
        }, 4000)
    }

    const showError = msg => {
        setError(msg)
        setTimeout(() => {
            setError(null)
        }, 4000)
    }
  
    const contactsToShow = () => {
        let regexp = new RegExp(filterer, "i");
        return persons.filter(person => regexp.test(person.name))
    }
    return (
      <div>
        <Notification message = {notification} className = "notification"/>
        <Notification message = {error} className = "error"/>
        <h2>Phonebook</h2>
        <h3>Filter contacts</h3>
        <Filter filterer = {filterer} setFilter = {setFilter}/>
        <h3>Add new contact</h3>
        <PersonForm newName = {newName} setNewName = {setNewName} newNum = {newNum} 
         setNewNum = {setNewNum} addName = {addName}/>
        <h2>Numbers</h2>
        <Contacts refresh = {refreshPersons} contacts = {contactsToShow()} notification = {showNotification}
            error = {showError}/>
      </div>
    )
  }

  export default App