const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Requiring routes
const indexRoutes = require('./routes/')
const propertiesRoutes = require('./routes/properties');

// Database setup
const mongoDB = process.env.DATABASE || "mongodb://localhost/properties_app"
mongoose.connect(mongoDB, {
  useMongoClient: true
});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connectior error:'));
database.once('open', () => {
  console.log("Connected to the database!");
});

const PORT = process.env.PORT || 3000;

// Express setup
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: "May the Force be with you",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Override POST methods for PUT and DELETE requests
app.use(methodOverride('_method'));

// Require static files such as CSS, JS, and images
app.use(express.static('public'));

// Local responses for flash messages
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash('success');
  next();
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Lo sentimos, algo salió mal...");
});

// Routes setup
app.use('/', indexRoutes);
app.use('/propiedades', propertiesRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("No podemos encontrar lo que pides...")
});

app.listen(PORT, () => {
  console.log("Server has started..."); 
});