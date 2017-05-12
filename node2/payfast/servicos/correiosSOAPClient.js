var soap = require('soap');

var CorreiosSOAPClient = function () {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

module.exports = function () {
    return CorreiosSOAPClient;
}

CorreiosSOAPClient.prototype.calculaPrazo = function (dadosDaEntrega, callback) {
    soap.createClient(this._url,
        function (err, cliente) {
            console.log('Cliente soap criado');
            cliente.CalcPrazo(dadosDaEntrega, callback);
        });
}