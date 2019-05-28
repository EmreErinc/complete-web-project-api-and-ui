var url = "https://warm-fortress-59974.herokuapp.com";
//var url = "http://localhost:4000"

angular
    .module('posts', [])
    .controller("posts", ($scope, $http) => {
        $http.get(url + '/posts')
            .then((res) => 
                $scope.posts = res.data
            )
    });