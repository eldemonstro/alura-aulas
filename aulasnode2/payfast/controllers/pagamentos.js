module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {
        console.log('Recebida requisição GET em /pagamentos');
        res.send('OK.');
    });

    app.delete('/pagamentos/pagamento/:id', function (req, res) {
        var id = req.params.id;
        var pagamento = {};

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDAO(connection);

        pagamento.id = id;
        pagamento.status = "CANCELADO";

        pagamentoDao.atualiza(pagamento, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            console.log("Pagamento " + pagamento.status);
            res.status(204).send(pagamento);
        });
    });

    app.put('/pagamentos/pagamento/:id', function (req, res) {
        var id = req.params.id;
        var pagamento = {};

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDAO(connection);

        pagamento.id = id;
        pagamento.status = "CONFIRMADO";

        pagamentoDao.atualiza(pagamento, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            console.log("Pagamento " + pagamento.status);
            res.send(pagamento);
        });

    });

    app.post('/pagamentos/pagamento', function (req, res) {
        console.log('Recebida requisição POST em /pagamentos/pagamento');

        req.assert('forma_de_pagamento',
            "Forma de pagamento eh obrigatoria")
            .notEmpty();

        req.assert('valor',
            'O valor eh obrigatorio e deve ser um decimal')
            .notEmpty()
            .isFloat();

        var errs = req.validationErrors();

        if (errs) {
            console.log('Erros de validacao encontrados');
            res.status(400).send(errs);
            return;
        }

        var pagamento = req.body;
        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDAO(connection);

        pagamentoDao.salva(pagamento, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                pagamento.id = result.insertId;
                res.location('/pagamentos/pagamento/' + pagamento.id);

                var response = {
                    dados_do_pagamento: pagamento,
                    links: [
                        {
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
        });
    });
}