module.exports = (app) => {
  var api = app.api.foto;
  app.get('/v1/fotos', api.lista);

  app.get('/v1/fotos/:id', (req, res) => {
    console.log(chalk.blue('Recebendo requisição em /v1/fotos/' +
      req.params.id));
  })
};
