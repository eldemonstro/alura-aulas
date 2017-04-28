var restify = require('restify');

var cliente = restify.createJSONClient({
    url: 'http://localhost:3001'
});

cliente.post('/cartoes/autoriza', function(erro, req, res, ret){
    console.log('consumindo serviço de cartao');
    console.log(ret);
});