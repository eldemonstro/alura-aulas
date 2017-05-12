module.exports = function(app) {
  app.get('/test', function(req, res) {
    console.log('Recebido requisição de test');
    res.send('OK.');
  });
}
