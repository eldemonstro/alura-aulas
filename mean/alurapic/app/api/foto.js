var api = {};
api.lista = (req, res) => {
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
}

module.exports = api;