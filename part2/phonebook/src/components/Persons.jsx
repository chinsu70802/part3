const Persons = (prop) => {
  if (prop.filter === '' && prop.persons.length != 0) {
    return (
      prop.persons.map((person) => (
        <div key={person.id}>
        <p key = {person.id}>{person.id} : {person.name} : {person.number}</p>
        <button onClick={() => prop.onDelFunc(person)}>Delete</button>
        </div>
      ))
    )
  }
  else if (prop.persons.length === 0) {
    return (
      <div>
      </div>
    )
  }
  else {
    return (
      prop.persons
      .filter((person) => person.name.toLowerCase().includes(prop.filter.toLowerCase()))
      .map((person) => (
        <div key={person.id}>
        <p key = {person.id}>{person.id} : {person.name} : {person.number}</p>
        <button onClick={() => prop.onDelFunc(person)}>Delete</button>
        </div>
      ))
    )
  }
} 

export default Persons