const express = require('express');
var app = express();

// Express middlewares
// Static MW
app.use(express.static('./public'));

// Express requests
app.get('/v1/fotos', (req, res) => {
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
  console.log('Requisicao em /v1/fotos');
  res.json(fotos);
});

// Exporting express object
module.exports = app;
