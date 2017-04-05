module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        //conectando no mysql
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs'
        });

        connection.query('select * from livros', function(err, result){
            res.send(results);
        });


        connection.end();
    });
}