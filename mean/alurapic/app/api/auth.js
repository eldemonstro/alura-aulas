module.exports = (app) => {
  const mongoose = require('mongoose');
  const jwt = require('jsonwebtoken');

  var api = {};
  var model = mongoose.model('Usuario');

  api.autentica = (req, res) => {
    console.log(chalk.blue('Recebendo requisição get /autenticar'));

    model.findOne({
        login: req.body.usuario,
        senha: req.body.senha
      })
      .then((usuario) => {
        console.log(usuario);
        if (!usuario) {
          console.log(chalk.red('Login e Senha invalidos'));
          res.sendStatus(401);
        } else {
          var token = jwt.sign({
            login: usuario.login
          }, app.get('secret'), {
            expiresIn: 84600
          });
          console.log(chalk.green('Token criado e sendo enviado no header ' +
            ' de resposta'));

          res.set('x-access-token', token);
          res.end();
        }
      }, (error) => {
        console.log(chalk.red('Login e Senha invalidos'));
        res.sendStatus(401);
      });
  };

  api.verificaToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (token) {
      console.log(chalk.blue('Verificando token...'));
      jwt.verify(token, app.get('secret'), (err, decoded) => {
        if (err) {
          console.log(chalk.red('Token rejeitado'));
          res.sendStatus(401);
        }
        req.usuario = decoded;
        next();
      });
    } else {
      console.log(chalk.red('Token não enviado'));
      res.sendStatus(401);
    }
  };

  return api;
};
