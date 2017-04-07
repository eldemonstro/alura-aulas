var connectionFactory = require('../infra/connectionFactory');
module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        //conectando no mysql
        var connection = connectionFactory();

        connection.query('select * from livros', function(err, result){
            res.render('produtos/lista', {lista:result});
        });
        connection.end();
    });
}