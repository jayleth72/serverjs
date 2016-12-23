const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));



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
    currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});



// /bad - send back with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to send request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
