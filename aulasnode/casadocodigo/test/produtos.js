var express = require('../config/express')();
var request = require('supertest')(express);

describe('produtosController', function () {

    beforeEach(function(done) {
        var conn = express.infra.connectionFactory();
        conn.query("delete from livros", function(ex, results){
            if(!ex){
                done();
            } else {
                console.log(ex);
            }
        });
    });

    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect(200, done)
            .expect('Content-Type', /json/);
    });

    it('#listagem html', function (done) {
        request.get('/produtos')
            .set('Accept', 'text/html')
            .expect(200, done)
            .expect('Content-Type', /html/);
    });

    it('#cadastro de novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({
                titulo: "",
                descricao: "novo livro",
                preco: 32
            })
            .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function (done) {
        request.post('/produtos')
            .send({
                titulo: "GAbmOntes",
                descricao: "novo livro",
                preco: 32
            })
            .expect(302, done);
    });
});