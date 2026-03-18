import { useState, useEffect } from 'react'
import axios from "axios"
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewNumber] = useState('')
  const [newID, setNewID] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const onTypeName = (event) => {
    setNewName(event.target.value)
  } 

  const onTypeNumber = (event) => {
    setNewNumber(event.target.value)
  } 

  const onTypeID = (event) => {
    setNewID(event.target.value)
  }

  const onFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const onLogName = (event) => {
    event.preventDefault()
    const found_name = persons.some((person) => (person.name === newName))
    const found_phone = persons.some((person) => (person.number === newPhone))
    const found_id = persons.some((person) => (person.id === newID))    
    if (found_name) {
      console.log(newName)
      alert(`${newName} already exists in the phonebook`)
      setNewName('')
    }
    else if (found_phone) {
      console.log(newPhone)
      alert(`Phone number ${newPhone} already exists in the phonebook`)
      setNewNumber('')      
    }
    else if (found_id){
      console.log(newID)
      alert(`ID ${newID} already exists in the phonebook`)
      setNewID('')        
    }
    else {
      if((newName === '')){
        alert('Please fill name!')
      }
      else if((newPhone === '')){
        alert('Please fill phone number!')
      }
      else if((newID === '')){
        alert('Please fill id!')
      }      
      else {
      const phoneObject = {
        name: newName,
        number: newPhone,
        id: newID
      }
      setPersons(persons.concat(phoneObject))
      setNewName('')
      setNewNumber('')
      setNewID('')
    }
  }
}

  return (
    <div>
      <h2>Search for specific contacts</h2>
      <Filter filter={newFilter} changeFunc = {onFilter}/>
      <h2>Add a new contact detail</h2>
      <PersonForm name={newName} phone={newPhone} id={newID} logFunc={onLogName} nameFunc={onTypeName} numFunc={onTypeNumber} idFunc={onTypeID}/>
      <h2>Your Phonebook</h2>
      <Persons filter={newFilter} persons={persons}/>
    </div>
  )
}

export default App