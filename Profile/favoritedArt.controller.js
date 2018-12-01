(() => {
    angular.module("BlogApp")
        .controller("FavoritedAticles", function ($stateParams, $scope, $http, $window, FavorService, $state) {
            var token = $window.localStorage.getItem('token');
            $scope.notArticle = false;
            $scope.currentPage = 1;
            $scope.prePage = 1;

            var request = function (offset) {
                if ($stateParams.username == $window.localStorage.getItem('username')) {
                    var req = {
                        method: "GET",
                        url: `https://conduit.productionready.io/api/articles?favorited=${$stateParams.username}&limit=5&offset=${offset}`,
                        headers: {
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
                    $scope.articles = data.data.articles;
                    $scope.totalItems = data.data.articlesCount;
                    $scope.notArticle = false;
                    $scope.itemsPerPage = 5;
                    $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
                    $scope.pages = [];
                    for (let i = 0; i < $scope.numPages; i++) {
                        if (i === $scope.currentPage - 1) {
                            $scope.pages.push({ num: i + 1, active: true });
                        } else {
                            $scope.pages.push({ num: i + 1, active: false });
                        }
                    }
                    if ($scope.totalItems === 0) {
                        $scope.paginationShow = false;
                        $scope.notArticle = true;
                    } else if ($scope.totalItems <= 5) {
                        $scope.paginationShow = false;
                    } else {
                        $scope.paginationShow = true;
                    }
                })
            }
            request(0);
            $scope.changePage = (num) => {
                if (num != $scope.currentPage) {
                    request((num - 1) * 5);
                    $scope.prePage = $scope.currentPage;
                    $scope.currentPage = num;
                    $scope.pages[$scope.currentPage - 1].active = true;
                    $scope.pages[$scope.prePage - 1].active = false;
                }
            }
            $scope.submit = function (article, ele) {
                if ($window.localStorage.getItem('username') != undefined) {
                    if (!article.favorited) {
                        FavorService.favorArt(article.slug, token).then(function (res) {
                            ele.article = res.article;

                        })
                    } else {
                        FavorService.unFavorArt(article.slug, token).then(function (res) {
                            ele.article = res.article;
                        })
                    }
                } else {
                    $state.go('signIn');
                }
            }
        })
})();