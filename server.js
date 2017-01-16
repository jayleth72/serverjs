const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// set port to 3000 if it does not exist
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

//middleware logger
app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable tp appear to server.log.');
    }
  })
  next();
});

// //maintenance mode
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//   // don't call next to halt program from here
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// respond to http get request
// app.get('/', (req, res) => {
//   //res.send('<h1>Hello Express</h1>');
//   res.send({
//     name: 'Jay',
//     likes: [
//       'Triathlon',
//       'Sleeping',
//       'Eating'
//     ]
//   });
// });
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hay man this is my home page',

  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});



// /bad - send back with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to send request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
