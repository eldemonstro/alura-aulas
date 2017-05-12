const chalk = require('chalk');
const logger = require('../servicos/logger.js');

module.exports = function(app) {
  app.get('/pagamentos', function(req, res) {
    console.log('Recebida requisição GET em /pagamentos');
    res.send('OK.');
  });

  app.get('/pagamentos/pagamento/:id', function(req, res) {
    var id = req.params.id;
    console.log(chalk.blue('consultando pagamento: ' + id));

    var memcachedClient = app.servicos.memcachedClient();

    memcachedClient.get('pagamento-' + id, function(err, ret) {
      if (err || !ret) {
        console.log(chalk.red('MISS - chave não encontrada'))
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDAO(connection);

        pagamentoDao.buscaPorId(id, function(err, resultado) {
          if (err) {
            console.log(chalk.red(err));
            res.status(500).send(err);
            return;
          }
          console.log(chalk.green('pagamento encontrado: ' + JSON.stringify(resultado)));

          res.json(resultado);
        });
      } else {
        console.log(chalk.green('HIT - valor: ' + JSON.stringify(ret)));
        res.json(ret);
      }
    });
  });

  app.delete('/pagamentos/pagamento/:id', function(req, res) {
    var id = req.params.id;
    var pagamento = {};

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDAO(connection);

    pagamento.id = id;
    pagamento.status = "CANCELADO";

    pagamentoDao.atualiza(pagamento, function(err) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      console.log("Pagamento " + pagamento.status);
      res.status(204).send(pagamento);
    });
  });

  app.put('/pagamentos/pagamento/:id', function(req, res) {
    var id = req.params.id;
    var pagamento = {};

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDAO(connection);

    pagamento.id = id;
    pagamento.status = "CONFIRMADO";

    pagamentoDao.atualiza(pagamento, function(err) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      console.log("Pagamento " + pagamento.status);
      res.send(pagamento);
    });

  });

  app.post('/pagamentos/pagamento', function(req, res) {
    console.log('Recebida requisição POST em /pagamentos/pagamento');

    req.assert('pagamento.forma_de_pagamento',
        "Forma de pagamento eh obrigatoria")
      .notEmpty();

    req.assert('pagamento.valor',
        'O valor eh obrigatorio e deve ser um decimal')
      .notEmpty()
      .isFloat();

    var errs = req.validationErrors();

    if (errs) {
      console.log('Erros de validacao encontrados');
      res.status(400).send(errs);
      return;
    }

    var pagamento = req.body['pagamento'];
    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDAO(connection);

    pagamentoDao.salva(pagamento, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        pagamento.id = result.insertId;

        var memcachedClient = app.servicos.memcachedClient();

        memcachedClient.set('pagamento-' + pagamento.id,
          pagamento,
          60000,
          function(erro) {
            console.log('nova chave adicionada');
          });

        if (pagamento.forma_de_pagamento == 'cartao') {
          var cartao = req.body["cartao"];
          var clienteCartoes = new app.servicos.clienteCartoes();
          clienteCartoes.autoriza(cartao, function(exception, request, response, retorno) {
            if (exception) {
              console.log(exception);
              res.status(400).send(exception);
            } else {

              res.location('/pagamentos/pagamento/' + pagamento.id);

              var resp = {
                dados_do_pagamento: pagamento,
                cartao: retorno,
                links: [{
                    href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                    rel: "confirmar",
                    method: "PUT"
                  },
                  {
                    href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                    rel: "cancelar",
                    method: "DELETE"
                  }
                ]
              }

              console.log(retorno);
              res.status(201).json(resp);

            }
            return;
          });

        } else {
          res.location('/pagamentos/pagamento/' + pagamento.id);

          var response = {
            dados_do_pagamento: pagamento,
            links: [{
                href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                rel: "confirmar",
                method: "PUT"
              },
              {
                href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                rel: "cancelar",
                method: "DELETE"
              }
            ]
          }

          console.log('pagamento criado');
          res.status(201).json(response);
        }
      }
    });
  });
}
