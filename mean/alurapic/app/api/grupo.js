var api = {};

api.lista = (req, res) => {
  var grupos = [{
      _id: 1,
      nome: 'esporte'
    },
    {
      _id: 2,
      nome: 'lugares'
    },
    {
      _id: 3,
      nome: 'animais'
    }
  ];
  console.log(chalk.blue('Requisicao em /v1/grupos'));
  res.json(grupos);
}

module.exports = api;
