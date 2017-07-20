const jsonfile = require('jsonfile-promised');
const fs = require('fs');

let data = {};

data.salvaDados = (curso, tempoEstudado) => {
  let arquivoDoCurso = __dirname + '/data/' + curso + '.json';
  if (fs.existsSync(arquivoDoCurso)) {
    data.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
  } else {
    data.criaArquivoDeCurso(arquivoDoCurso)
      .then(() => {
        data.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
      }).catch((err) => {
        console.error(err);
      });
  }
}

data.adicionaTempoAoCurso = (arquivoDoCurso, tempoEstudado) => {
  let dados = {
    ultimoEstudo: new Date().toString(),
    tempo: tempoEstudado
  }

  jsonfile.writeFile(arquivoDoCurso, dados, {
      spaces: 2
    })
    .then(() => {
      console.log('Tempo salvo com sucesso');
    }).catch((err) => {
      console.error(err);
    });
}

data.criaArquivoDeCurso = (nomeArquivo) => {
  return jsonfile.writeFile(nomeArquivo)
    .then(() => {
      console.log('Arquivo criado');
    }).catch((err) => {
      console.error(err);
    });
}

data.pegaDados = (curso) => {
  let arquivoDoCurso = __dirname + '/data/' + curso + '.json';
  return jsonfile.readFile(arquivoDoCurso);
}

module.exports = data;
