const express = require('express');
const router = express.Router();

// Require property model
const Property = require('../models/property');

// INDEX - show all properties
router.get('/', (req, res) => {
  // Get all properties from database
  Property.find({}, (err, allProperties) => {
    if (err) {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('/propiedades');
    } else {
      res.render('properties/index', {
        title: "Todas las propiedades",
        properties: allProperties
      });
    }
  });
});

// NEW - show form to create new property
router.get('/nueva', (req, res) => {
  // Render new property form
  res.render('properties/new', { title: "Crear nueva propiedad" });
});

// CREATE - add new property
router.post('/', (req, res) => {
  // Create new property in the database
  Property.create(req.body.property, (err, createdProperty) => {
    if (err) {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('/propiedades/nueva');
    } else {
      // After creating a new property, redirect to index
      req.flash('success', "¡Has creado una nueva propiedad!");
      res.redirect('/propiedades');
    }
  });
});

// SHOW - shows info about one property
router.get('/:id', (req, res) => {
  // Find property using the provided ID
  Property.findById(req.params.id, (err, foundProperty) => {
    if (err) {
      console.log(err);
      req.flash('error', "No pudimos encontrar esa propiedad");
      res.redirect('/propiedades');
    } else {
      // Show found property
      res.render('properties/show', { property: foundProperty })
    }
  });
});

// EDIT - shows edit form for property
router.get('/:id/editar', (req, res) => {
  // Find property using the provided ID
  Property.findById(req.params.id, (err, foundProperty) => {
    if (err) {
      console.log(err);
      req.flash('error', "No pudimos encontrar esa propiedad");
      res.redirect('/propiedades');
    } else {
      // Show edit property form
      res.render('properties/edit', { property: foundProperty, title: "Editar propiedad" })
    }
  });
});

// UPDATE - updates property
router.put('/:id', (req, res) => {
  // Find and update the property
  Property.findByIdAndUpdate(req.params.id, req.body.property, (err, updatedProperty) => {
    if (err) {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('/propiedades/' + req.params.id);
    } else {
      // Redirect to updated property
      req.flash('success', "La propiedad ha sido actualizada exitosamente.");
      res.redirect('/propiedades/' + req.params.id);
    }
  });
});

// DESTROY - destroy property
router.delete('/:id', (req, res) => {
  Property.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('/propiedades/');
    } else {
      // After deleting property, redirect to index
      req.flash('success', "La propiedad ha sido eliminada exitosamente.")
      res.redirect('/propiedades');
    }
  });
});

module.exports = router;