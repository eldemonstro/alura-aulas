const express = require('express');
const consign = require('consign');
chalk = require('chalk');
var app = express();

// Express middlewares
// Static MW
app.use(express.static('./public'));

consign({
    cwd: 'app'
  })
  .include('api')
  .then('routes')
  .into(app);

// Exporting express object
module.exports = app;
