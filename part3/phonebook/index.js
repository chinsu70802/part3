const express = require('express')
const app = express()
app.use(express.json())

let phoneDir = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(phoneDir)
})

app.get('/info', (request,response) => {
    response.send(`<p>Phonebook has info for ${phoneDir.length} people</p>
                    <p>${Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const entry = phoneDir.find((phone) => phone.id === id)
    if (entry) {
        response.json(entry)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phoneDir = phoneDir.filter((phone) => phone.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const phone = request.body
    if (!phone.name) {
        return response.status(400).json({
            error: "Name propperty is missing!"
        })
    }
    if(!phone.number) {
        return response.status(400).json({
            error: "Number property is missing!"
        })
    }
    const found_name = phoneDir.some((person) => person.name.toLowerCase() === phone.name.toLowerCase())
    if(found_name) {
        return response.status(400).json({
            error: `The name ${phone.name} already exists!`
        })
    }
    phone.id = String(Math.floor(Math.random() * 10000000 + 6))
    phoneDir = phoneDir.concat(phone)
    response.json(phone)    

})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})