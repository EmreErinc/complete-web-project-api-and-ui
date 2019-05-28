var url = "https://warm-fortress-59974.herokuapp.com";
//var url = "http://localhost:4000"

angular
    .module("postDetail", [])
    .controller("postDetail", ($scope, $http) => {
        var id = document.URL.split("/")[4];
        $http.get(url + "/posts/" + id)
            .then(res => {
                $scope.post = res.data;
                $scope.publishDate = new Date(res.data.id).toLocaleDateString();
            });
    });