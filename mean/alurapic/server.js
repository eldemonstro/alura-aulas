const http = require('http');
const app = require('./config/express');
chalk = require('chalk');
require('./config/database')('localhost/alurapic');

http.createServer(app)
  .listen(3000, () => {
    console.log(chalk.green('Escutando na porta 3000'));
  });
