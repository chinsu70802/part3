const PersonForm = (prop) => {
  return (
      <form onSubmit={prop.logFunc}>
        <div>
          name: <input value = {prop.name} onChange={prop.nameFunc}/>
        </div>
        <div>
          number: <input value = {prop.phone} onChange={prop.numFunc}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm