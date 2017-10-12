const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Setup property schema
const PropertySchema = new Schema({
  description: String,
  image: String,
  address: String,
  city: String,
  province: String,
  country: String,
  value: {
    type: Number,
    // Set value to Dominican Pesos
    set: num => Number(num)
  },
  dimensions: {
    type: Number,
    set: num => Math.floor(num)
  }
});

// Setup a virtual getter for currency value
PropertySchema.virtual('price').get(function() {
  return this.value.toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
});

module.exports = mongoose.model('Property', PropertySchema);