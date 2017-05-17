var api = {};
var count = 2;

var fotos = [{
    _id: 1,
    titulo: 'Gato',
    url: 'http://www.fundosanimais.com/800x600/gato.jpg'
  },
  {
    _id: 2,
    titulo: 'Otro Gato',
    url: 'http://www.fundosanimais.com/800x600/wallpapers-gatos.jpg'
  }
];

api.lista = (req, res) => {
  console.log(chalk.blue('Recebendo requisição get em /v1/fotos/'));
  res.json(fotos);
}

api.buscaPorId = (req, res) => {
  console.log(chalk.blue('Recebendo requisição get em /v1/fotos/' +
    req.params.id));

  var foto = fotos.find((foto) => {
    return foto._id == req.params.id;
  });

  res.json(foto);
};

api.removePorId = (req, res) => {
  console.log(chalk.blue('Recebendo requisição delete em /v1/fotos/' +
    req.params.id));

  fotos = fotos.filter((foto) => {
    return foto._id != req.params.id;
  });

  res.sendStatus(204);
};

api.adiciona = (req, res) => {
  console.log(chalk.blue('Recebendo requisição post em /v1/fotos/'));
  console.log(chalk.blue('| ' + JSON.stringify(req.body)));
  var foto = req.body;
  foto._id = ++count;
  console.log(chalk.blue('| ' + JSON.stringify(foto)));
  fotos.push(foto);
  res.json(foto);
};

api.atualizarPorId = (req, res) => {
  console.log(chalk.blue('Recebendo requisição put em /v1/fotos/' +
    req.params.id));
  console.log(chalk.blue('| ' + JSON.stringify(req.body)));

  var foto = req.body;
  var fotoId = req.params.id;

  var indice = fotos.findIndex((foto) => {
    return foto._id == fotoId;
  });

  fotos[indice] = foto;

  res.sendStatus(200);
};

module.exports = api;
