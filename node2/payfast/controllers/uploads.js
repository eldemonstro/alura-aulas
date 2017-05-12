var chalk = require('chalk');
const fs = require('fs');

module.exports = function(app) {
  app.post('/upload/imagem', function(req, res) {
    console.log(chalk.red('recebendo imagem'));

    var filename = req.headers.filename;
    req.pipe(fs.createWriteStream('file/' + filename))
      .on('finish', function() {
        console.log(chalk.green('arquivo escrito'));
        res.status(201).send('ok');
      });
  });
}
