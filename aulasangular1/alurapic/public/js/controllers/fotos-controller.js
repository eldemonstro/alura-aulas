angular.module('alurapic').controller('FotosController', function ($scope, $http) {
    $scope.fotos = [];

    $http.get('v1/fotos')
    .success(function (ret) {
        $scope.fotos = ret;
    })
    .error(function (err) {
        console.log(err);
    });

    /*
        var promise = $http.get('v1/fotos');
        promise.then(function (ret) {
            $scope.fotos = ret.data;
        }).catch(function (err) {
            console.log(err);
        });
    */
});