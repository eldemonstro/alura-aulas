const mongoose = require('mongoose');

var api = {};

var model = mongoose.model('Foto');

api.lista = (req, res) => {
  console.log(chalk.blue('Recebendo requisição get em /v1/fotos/'));

  model.find({})
    .then((fotos) => {
      res.json(fotos);
    }, (error) => {
      console.log(chalk.red('Erro ao acessar o banco de dados: ' + error));
      res.status(500).json(error);
    })
}

api.buscaPorId = (req, res) => {
  console.log(chalk.blue('Recebendo requisição get em /v1/fotos/' +
    req.params.id));

  model.findById(req.params.id)
    .then((foto) => {
      if (!foto) {
        throw Error('Foto não encontrada');
      }
      res.json(foto);
    }, (error) => {
      console.log(chalk.red('Erro ao acessar o banco de dados: ' + error));
      res.status(404).json(error);
    });

};

api.removePorId = (req, res) => {
  console.log(chalk.blue('Recebendo requisição delete em /v1/fotos/' +
    req.params.id));

  model.remove({
      _id: req.params.id
    })
    .then(() => {
      res.sendStatus(204);
    }, (error) => {
      console.log(chalk.red('Erro ao acessar o banco de dados: ' + error));
      res.status(404).json(error);
    });
};

api.adiciona = (req, res) => {
  console.log(chalk.blue('Recebendo requisição post em /v1/fotos/'));
  console.log(chalk.blue('| ' + JSON.stringify(req.body)));

  model.create(req.body)
    .then((foto) => {
      res.json(foto);
    }, (error) => {
      console.log(chalk.red('Erro ao acessar o banco de dados: ' + error));
      res.status(500).json(error);
    });
};

api.atualizarPorId = (req, res) => {
  console.log(chalk.blue('Recebendo requisição put em /v1/fotos/' +
    req.params.id));
  console.log(chalk.blue('| ' + JSON.stringify(req.body)));

  model.findByIdAndUpdate(req.params.id, req.body)
    .then((foto) => {
      res.json(foto);
    }, (error) => {
      console.log(chalk.red('Erro ao acessar o banco de dados: ' + error));
      res.status(500).json(error);
    });

};

module.exports = api;
