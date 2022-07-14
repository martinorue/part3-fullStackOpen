const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan(':url :method :body'));


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
morgan.token('body', (req) => JSON.stringify(req.body))

app.get('/api/persons', morgan('tiny'), (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

app.get('/info', (request, response) => {
    response.send(
        `<h1>Phonebook has info for ${persons.length} people</h1>
        <h2>${new Date()}</h2>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const getRandomInt = max => Math.floor(Math.random() * max)


app.post('/api/persons', morgan('tiny'), (request, response) => {
    const body = request.body
    const person_exist = persons.filter(p => p.name === body.name);

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name and number are required'
        })
    } else if (person_exist.length > 0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: getRandomInt(Number.MAX_SAFE_INTEGER),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})