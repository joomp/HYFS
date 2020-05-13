import React from 'react'
import contactService from '../services/contacts'

const Contacts = ({contacts, refresh, error, notification}) => {
    return (
      <ul>
        {contacts.map((person) => {
          return <Contact key = {person.name + person.number} person = {person} refresh = {refresh}
          notification = {notification} error = {error}/>
        })}
      </ul>
    )
}

const Contact = ({refresh, person, error, notification}) => {
    const onclick = () => {
        const message = `Are you sure you want to remove ${person.name} from your contacts? (ID: ${person.id})`
        const result = window.confirm(message)
        if (result){
            contactService.remove(person.id)
            .then( resp =>{
                notification(`${person.name} was deleted succesfully`)
                refresh()})
            .catch(e => {
                error(`Error! ${person.name} was already deleted from the server`)
                refresh()
            })
        }
    }
    return (
        <li > 
            {`${person.name}, ${person.number}`}
            <button onClick = {onclick}> Delete Contact </button>
        </li>)
}

export default Contacts