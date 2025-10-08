// ===================================================================================
require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// ==================== Middleware ====================
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'dist')))
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
//  get info peson statistique
app.get('/info', async (req, res) => {
  const count = await Person.countDocuments({})
  const date = new Date()
  res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>
    `)
})
// ===================================================================================


// ===================================================================================
//  create new person and check if this name person is ewist for unique
//  if person name and person number empty return status 400 and message error
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        existingPerson.number = body.number
        return existingPerson.save().then(updatedPerson => {
          response.json(updatedPerson)
        })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        })

        person.save()
          .then(savedPerson => response.status(201).json(savedPerson))
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})
// ===================================================================================

// ===================================================================================
//  get singale person by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

// ===================================================================================

// ===================================================================================
//  delete person by id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})
// ===================================================================================

// ===================================================================================
//  get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})
// ===================================================================================

// ===================================================================================
// update item person by id
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})
// ===================================================================================






// ===================================================================================
//  handle error when i want delete or get or update item not exists in databse
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
// ===================================================================================





// ===================================================================================
// when runing server
// const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
// ===================================================================================