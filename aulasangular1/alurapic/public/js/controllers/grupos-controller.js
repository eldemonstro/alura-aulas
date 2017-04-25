angular.module('alurapic').controller('GruposController', function ($scope, $http, $resource) {
    $scope.grupos = [];

    $http.get('v1/grupos')
        .success(function (grupos) {
            $scope.grupos = grupos;
        })
        .error(function (err) {
            console.log(err);
        });
});