import React from 'react'

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

export default Filter