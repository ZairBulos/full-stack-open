const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const Person = require('./models/person');

const errorHandle = (error, req, res, next) => {
  if (error.name = 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name = 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(cors());
app.use(express.json());
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}));
app.use(errorHandle);

app.get('/', (req, res) => {
  res.send('<h1>API PERSONS</h1>');
});

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const message =
      `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
       `;
    res.send(message);
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error)
    );
});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(data => data.toJSON())
    .then(dataJSON => {
      response.json(dataJSON);
    })
    .catch(error => next(error)
    );
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(data => {
      response.json(data.toJSON());
    })
    .catch(error => next(error)
    );
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error)
    );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});