const {
  ipcRenderer
} = require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');

window.onload = () => {
  let dados = data.pegaDados(curso.textContent)
    .then((dados) => {
      console.log(dados);
      tempo.textContent = dados.tempo;
    }).catch((err) => {

    });
}

linkSobre.addEventListener('click', function() {
  ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
botaoPlay.addEventListener('click', () => {
  if (play == true)
    timer.parar(curso.textContent);
  else
    timer.iniciar(tempo);
  play = !play;
  imgs.reverse();
  botaoPlay.src = imgs[0];
});
