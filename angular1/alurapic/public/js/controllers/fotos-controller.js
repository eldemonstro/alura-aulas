angular.module('alurapic').controller('FotosController', function ($scope, recursoFoto) {
    $scope.fotos = [];
    $scope.filtro = '';
    $scope.mensagem = '';

    recursoFoto.query(function (fotos) {
        $scope.fotos = fotos;
    }, function (err) {
        console.log(err);
    });

    $scope.remover = function (foto) {

        recursoFoto.delete({ foto: foto._id }, function () {
            var indiceFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceFoto, 1);
            $scope.mensagem = 'Foto ' + foto.titulo + ' cabou';

        }, function (err) {
            console.log(err);
            $scope.mensagem = 'Não foi possivel remover ' + foto.titulo;

        });

        /*
        $http.delete('v1/fotos/' + foto._id)
            .success(function () {
                var indiceFoto = $scope.fotos.indexOf(foto);
                $scope.fotos.splice(indiceFoto, 1);
                $scope.mensagem = 'Foto ' + foto.titulo + ' cabou';
            })
            .error(function (err) {
                console.log(err);
                $scope.mensagem = 'Não foi possivel remover ' + foto.titulo;
            });
            */
    };
    /*
        $http.get('v1/fotos')
        .success(function (ret) {
            $scope.fotos = ret;
        })
        .error(function (err) {
            console.log(err);
        });
    
            var promise = $http.get('v1/fotos');
            promise.then(function (ret) {
                $scope.fotos = ret.data;
            }).catch(function (err) {
                console.log(err);
            });
    */
});