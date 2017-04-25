angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams) {
    $scope.foto = {};
    $scope.mensagem = '';

    if ($routeParams.fotoId) {
        $http.get('v1/fotos/' + $routeParams.fotoId)
            .success(function (foto) {
                $scope.foto = foto;
                console.log(foto);
            })
            .error(function (err) {
                console.log(err);
                $scope.mensagem = 'Não foi possivel obter a mensagem';
            });
    }

    $scope.submeter = function () {
        if ($scope.formulario.$valid) {
            if ($scope.foto._id) {
                $http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
                    .success(function () {
                        $scope.mensagem = 'Foi possivel editar';
                    })
                    .error(function (err) {
                        console.log(err);
                        $scope.mensagem = 'Não foi possivel editar';
                    });
            } else {
                console.log($scope.foto);
                $http.post('v1/fotos', $scope.foto)
                    .success(function () {
                        $scope.foto = {};
                        $scope.mensagem = 'Foto cadastrada com sucesso';
                    })
                    .error(function (erro) {
                        console.log(erro);
                        $scope.mensagem = 'Deu errado';
                    });
            }
        }
    };
});