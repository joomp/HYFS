import React from 'react'

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

export default PersonForm