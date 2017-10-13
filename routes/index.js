const express = require('express');
const router = express.Router();

// Require property model
const Property = require('../models/property');

router.get('/', (req, res) => {
  res.redirect('/propiedades');
});

router.get('/busqueda', (req, res) => {
  // create a case-insensitive RegExp for search
  let regexp = new RegExp(req.query.q, 'i');
  // Search all properties that contain the regular expression
  Property.find({
    '$or': [
      { 'description': regexp },
      { 'city': regexp },
      { 'province': regexp },
      { 'country': regexp }
    ]
  }, (err, foundProperties) => {
    if (err) {
      console.log(err);
      req.flash('error', "Su búsqueda no pudo ser realizada");
      res.redirect('/propiedades');
    } else {
      res.render('properties/index', {
        title: "Propiedades encontradas",
        properties: foundProperties
      });
    }
  });
});

module.exports = router;