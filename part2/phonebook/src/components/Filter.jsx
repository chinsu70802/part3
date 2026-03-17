const Filter = (prop) => {
  return (
        <form>
        <div>
          Enter a name to filter contact details from your phonebook: <input value={prop.filter} onChange={prop.changeFunc}/>
        </div>
      </form>
  )
}

export default Filter