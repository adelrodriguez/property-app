const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Setup property schema
const PropertySchema = new Schema({
  description: {
    type: String,
    required: [true, 'Debes incluir una descripción']
  },
  image: String,
  address: {
    type: String,
    required: [true, 'Debes incluir una dirección']
  },
  city: {
    type: String,
    required: [true, 'Debes incluir una ciudad']
  },
  province: {
    type: String,
    required: [true, 'Debes incluir una provincia']
  },
  country: {
    type: String,
    required: [true, 'Debes incluir un país']
  },
  value: {
    type: Number,
    // Set value to Dominican Pesos
    set: num => Number(num),
    required: [true, 'Debes incluir una valoración']
  },
  dimensions: {
    type: Number,
    set: num => Math.floor(num),
    required: [true, 'Debes incluir dimensiones']
  }
});

// Setup a virtual getter for currency value
PropertySchema.virtual('price').get(function() {
  return this.value.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
});

module.exports = mongoose.model('Property', PropertySchema);