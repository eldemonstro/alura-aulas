var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
    console.log("Servidor rodando");
});