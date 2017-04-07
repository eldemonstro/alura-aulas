module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        //conectando no mysql
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'admin',
            database : 'casadocodigo_nodejs'
        });

        connection.query('select * from livros', function(err, result){
            console.log(result[0].id);
            res.render('produtos/lista', {lista:result});
        });
        connection.end();
    });
}