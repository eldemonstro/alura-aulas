module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {
        console.log('Recebida requisição GET em /pagamentos');
        res.send('OK.');
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

        if(errs) {
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
                res.location('/pagamentos/pagamento/' + result.insertId);
                console.log('pagamento criado');
                res.status(201).json(pagamento);
            }
        });
    });
}