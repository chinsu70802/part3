const Persons = (prop) => {
  if (prop.filter === '') {
    return (
      prop.persons.map((person) => (
        <p key = {person.id}>{person.id} : {person.name} : {person.phone}</p>
      ))
    )
  }
  else {
    return (
      prop.persons
      .filter((person) => person.name.toLowerCase().includes(prop.filter.toLowerCase()))
      .map((person) => (
        <p key = {person.id}>{person.id} : {person.name} : {person.phone}</p>
      ))
    )
  }
} 

export default Persons