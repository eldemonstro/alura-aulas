const {
  ipcRenderer,
  shell
} = require('electron');
const process = require('process');

let linkFechar = document.querySelector('#link-fechar');
let linkGithub = document.querySelector('#link-github');
let versaoElectron = document.querySelector('#versao-electron');
let versaoProjeto = document.querySelector('#versao-projeto');

window.onload = function() {
  versaoElectron.textContent = process.versions.electron;
  versaoProjeto.textContent = process.env.npm_package_version;
};

linkFechar.addEventListener('click', () => {
  ipcRenderer.send('fechar-janela-sobre');
});

linkGithub.addEventListener('click', () => {
  shell.openExternal('https://github.com/eldemonstro');
});
