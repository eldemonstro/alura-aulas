const memcached = require('memcached');
const chalk = require('chalk');

module.exports = function() {
  return createMemcachedClient;
}

function createMemcachedClient() {
  var client = new memcached('localhost:11211', {
    retries: 10,
    retry: 10000,
    remove: true
  });
  return client;
}

// client.set('pagamento-3', {
//   'id': 3
// }, 60000, function(err) {
//   console.log(chalk.blue('nova chave adicionada o cache'));
// });
//
// client.get('pagamento-3', function(err, ret) {
//   if (err || !ret) {
//     console.log(chalk.red('MISS - chave não encontrada'))
//   } else {
//     console.log(chalk.green('HIT - valor: ' + JSON.stringify(ret)));
//   }
// });
