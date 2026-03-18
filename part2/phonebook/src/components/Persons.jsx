const Persons = (prop) => {
  if (prop.filter === '') {
    return (
      prop.persons.map((person) => (
        <p key = {person.id}>{person.id} : {person.name} : {person.number}</p>
      ))
    )
  }
  else {
    return (
      prop.persons
      .filter((person) => person.name.toLowerCase().includes(prop.filter.toLowerCase()))
      .map((person) => (
        <p key = {person.id}>{person.id} : {person.name} : {person.number}</p>
      ))
    )
  }
} 

export default Persons