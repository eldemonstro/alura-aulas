const moment = require('moment');
let segundos = 0;
let timer;

let segundosParaTempo = (segundos) => {
  return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
}

module.exports = {
  iniciar(elem) {
    let tempo = moment.duration(elem.textContent);
    segundos = tempo.asSeconds();
    clearInterval(timer);
    timer = setInterval(() => {
      segundos++;
      elem.textContent = segundosParaTempo(segundos);
    }, 1000);
  },
  parar() {
    clearInterval(timer);
  }
};
