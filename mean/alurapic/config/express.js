const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
var app = express();

// Express middlewares
// Static MW
app.use(express.static('./public'));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Secret
app.set('secret', 'ultramandalusz');

consign({
    cwd: 'app'
  })
  .include('models')
  .then('api')
  .then('routes/auth')
  .then('routes')
  .into(app);

// Exporting express object
module.exports = app;
