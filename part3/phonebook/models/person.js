require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database');
  })
  .catch((error) => {
    console.log(`error connecting to database ${error}`);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  number: {
    type: String,
    require: true,
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});
personSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', personSchema);

module.exports = {
  Person
};