var restify = require('restify');

function CartoesClient() {
    this._cliente = restify.createJSONClient({
        url: 'http://localhost:3001'
    });
}

CartoesClient.prototype.autoriza = function (cartao, callback) {
    this._cliente.post('/cartoes/autoriza',
        cartao, callback);
}

module.exports = function () {
    return CartoesClient;
}