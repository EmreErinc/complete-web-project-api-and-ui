var url = "https://warm-fortress-59974.herokuapp.com";
//var url = "http://localhost:4000"

angular
    .module('references', [])
    .controller("references", ($scope, $http) => {
        $http.get(url + '/references')
            .then((res) => 
                $scope.references = res.data
            );
    });