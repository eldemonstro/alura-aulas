var app = require('./config/custom-express.js')();

app.listen(3000, function() {
  console.log('Escutando na porta 3000');
});
