var url = "https://warm-fortress-59974.herokuapp.com";
//var url = "http://localhost:4000"

angular
    .module('contact', [])
    .controller("contact", ($scope, $http) => {
        $http.get(url + '/contact')
            .then((res) => 
                $scope.contact = res.data
            );
    });