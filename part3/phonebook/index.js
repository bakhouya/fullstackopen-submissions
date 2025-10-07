// ===================================================================================
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
// ===================================================================================

// ===================================================================================
// Create a custom Morgan token to log request body only for POST requests
// Then use it in the log format to display request info along with sent data
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// ===================================================================================






// ===================================================================================
// default list persons 
let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      number: "39-44-5323523" ,
      name: "Ada Lovelace", 
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]
// ===================================================================================


// ===================================================================================
//  get info peson statistique
app.get('/info', (request, response) => {
  const count = persons.length  
  const date = new Date()       
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})
// ===================================================================================


// ===================================================================================
//  create new person and check if this name person is ewist for unique 
//  if person name and person number empty return status 400 and message error
app.post('/api/persons', (request, response) => {
    const person = request.body

    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'Name or number missing' })
    }

    const existing = persons.find(p => p.name === person.name)
    if (existing) {
        return response.status(400).json({ error: 'Name must be unique' })
    }

    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0

    const newPerson = { ...person, id: maxId + 1 }

    persons = persons.concat(newPerson)
    response.status(201).json(newPerson)
})
// ===================================================================================


// ===================================================================================
//  get singale person by ID 
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)   
    if (person) {
        response.json(person)
    } else {
        response.status(404).json({ error: 'Person not found' }).end()
    }
})
// ===================================================================================


// ===================================================================================
//  delete person by id
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id) // check if this id person exist
    //    if not exist return status 404 and error message 
    if (!person) {
        return response.status(404).json({ error: 'Person not found' })
    }
    //  if exist remove it and return status 204 
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})
// ===================================================================================


// ===================================================================================
//  get all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
// ===================================================================================



// ===================================================================================
// when runing server 
// const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
// ===================================================================================