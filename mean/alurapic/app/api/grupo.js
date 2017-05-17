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
    console.log('Requisicao em /v1/grupo');
    res.json(grupos);
}

module.exports = api;