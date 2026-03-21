import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notifications from './components/Notifications.jsx'
import phoneService from './services/phoneDir.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [newStyle, setNewStyle] = useState(null)

  useEffect(() => {
      phoneService
      .getAll()
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

  const onFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const onDelete = (person) => {
    let result = confirm(`Delete ${person.name}?`)
    if (result) {    
      const id = person.id
      phoneService
      .deleteDir(id)
      .then(() => {
        setPersons(persons
                  .filter((person) => person.id != id)
        )
        setNewStyle({
          color: 'green',
          fontStyle: 'italic',
          textAlign: 'center'
        })
        setNewMessage(`Deleted ${person.name} from your phone directory!`)
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
    })}
  }

  const onLogName = (event) => {
    event.preventDefault()
    const found_name = persons.some((person) => (person.name.toLowerCase() === newName.toLowerCase()))
    const found_phone = persons.some((person) => (person.number === newPhone))   
    if (found_name) {
      let result = confirm(`${newName} is already added to phonebook. Do you want to replace their phone number with the recently entered one?`)
      if (result) {
        const person = persons.find((person) => person.name.toLowerCase() == newName.toLowerCase())
        const changedPerson = {...person, number: newPhone}
        phoneService
        .updateDir(changedPerson)
        .then((response) => {
          setPersons(persons.map((person) => person.name === newName ? response.data : person))
          setNewName('')
          setNewNumber('')
          setNewStyle({
            color: 'green',
            fontStyle: 'italic',
            textAlign: 'center'
          })
          setNewMessage(`Updated ${newName}'s details!`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
        .catch(() => {
          setNewStyle({
            color: 'red',
            fontStyle: 'italic',
            textAlign: 'center'
          })
          setNewMessage(`${newName} has already been deleted from the server :(`)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
        })
      }   
    }
    else {
      if((newName === '')){
        alert('Please fill name!')
      }
      else if((newPhone === '')){
        alert('Please fill phone number!')
      }    
      else {
      const phoneObject = {
        name: newName,
        number: newPhone,
        id: persons.length > 0 ? (parseInt(persons[persons.length - 1].id,10) + 1).toString() : "1"
      }
      phoneService
      .addNew(phoneObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNewStyle({
          color: 'green',
          fontStyle: 'italic',
          textAlign: 'center'
        })
        setNewMessage(`Added ${newName} to your phone directory!`)
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
    }
  }
}

  return (
    <div>
      <Notifications message={newMessage} notifStyle={newStyle}/>
      <h2>Search for specific contacts</h2>
      <Filter filter={newFilter} changeFunc = {onFilter}/>
      <h2>Add a new contact detail</h2>
      <PersonForm name={newName} phone={newPhone} logFunc={onLogName} nameFunc={onTypeName} numFunc={onTypeNumber}/>
      <h2>Your Phonebook</h2>
      <Persons filter={newFilter} persons={persons} onDelFunc={onDelete}/>
    </div>
  )
}

export default App