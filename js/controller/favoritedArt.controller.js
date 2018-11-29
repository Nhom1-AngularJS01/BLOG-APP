(() => {
    angular.module("BlogApp")
        .controller("FavoritedAticles", function ($stateParams, $scope, $http, $window, FavorService, $state) {
            console.log($stateParams.username);
            var token = $window.localStorage.getItem('token');
            $scope.notArticle = false;

            var request = function (offset) {
                if ($stateParams.username == $window.localStorage.getItem('username')) {
                    var req = {
                        method: "GET",
                        url: `https://conduit.productionready.io/api/articles?favorited=${$stateParams.username}&limit=5&offset=${offset}`,
                        headers : {
                            'Authorization': `Token ${token}`
                        }
                    }
                } else {
                    var req = {
                        method: "GET",
                        url: `https://conduit.productionready.io/api/articles?favorited=${$stateParams.username}&limit=5&offset=${offset}`
                    }
                }
                $http(req).then(data => {
                    if ($scope.articles != []) {
                        $scope.articles = data.data.articles;
                        $scope.totalItems = data.data.articlesCount;
                        console.log($scope.articles);
                        $scope.notArticle = false;
                        $scope.currentPage = 1;
                        $scope.itemsPerPage = 5;
                        if ($scope.totalItems === 0) {
                            $scope.paginationShow = false;
                            $scope.notArticle = true;
                        } else if ($scope.totalItems <= 5) {
                            $scope.paginationShow = false;
                            // $scope.notArticle = true;
                        } else {
                            $scope.paginationShow = true;
                        }
                    }
                })
            }
            request(0);
            $scope.changePage = (currentPage) => {
                request((currentPage - 1) * 5);
            }

            $scope.submit = function (article, ele) {
                if ($window.localStorage.getItem('username') != undefined) {
                    if (!article.favorited) {
                        FavorService.favorArt(article.slug, token).then(function (res) {
                            ele.article = res.article;
                            console.log('like');

                        })
                    } else {
                        FavorService.unFavorArt(article.slug, token).then(function (res) {
                            ele.article = res.article;
                            console.log('unlike');
                        })
                    }
                } else{
                    $state.go('signIn');
                }
            }

        })
})();