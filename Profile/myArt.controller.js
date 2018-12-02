(() => {
    angular.module("BlogApp")
        .controller("ProfileUser", function ($stateParams, $state, $scope, $http, $window, getAllArticle, FavorService) {
            var token = $window.localStorage.getItem('token');
            var request;
            $scope.currentPage = 1;
            $scope.prePage = 1;
            $scope.notMyArticle = false;
            $scope.isFeed = true;
            if (token != null) {
                request = {
                    method: "GET",
                    url: `https://conduit.productionready.io/api/profiles/${$stateParams.username}`,
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            } else {
                request = {
                    method: "GET",
                    url: `https://conduit.productionready.io/api/profiles/${$stateParams.username}`
                }
            }
            $http(request).then(data => {
                ({ data: { profile: $scope.profile } } = data);
                $scope.show = $scope.profile.following;
            });

            $scope.load = (select) => {
                if (select === 'My' && $scope.isFeed === false) {
                    $scope.isFeed = true;
                }
                if (select === 'Favorited' && $scope.isFeed === true) {
                    $scope.isFeed = false;
                }
            }
            if ($stateParams.username == $window.localStorage.getItem('username')) {
                $scope.showFollow = "Edit Profile ";
            } else {
                $scope.showFollow = "Follow "
            }
            var reques = function (offset) {
                if ($stateParams.username == $window.localStorage.getItem('username')) {
                    var req = {
                        method: "GET",
                        url: `https://conduit.productionready.io/api/articles?author=${$stateParams.username}&limit=5&offset=${offset}`,
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }
                } else {
                    var req = {
                        method: "GET",
                        url: `https://conduit.productionready.io/api/articles?author=${$stateParams.username}&limit=5&offset=${offset}`
                    }
                }
                $http(req).then(data => {
                    ({ data: { articles: $scope.articles } } = data);
                    $scope.totalItems = data.data.articlesCount;
                    $scope.notMyArticle = false;
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
                        $scope.notMyArticle = true;
                    } else if ($scope.totalItems <= 5) {
                        $scope.paginationShow = false;
                    } else {
                        $scope.paginationShow = true;
                    }
                })
            }
            reques(0);
            $scope.changePage = (num) => {
                if (num != $scope.currentPage) {
                    reques((num - 1) * 5);
                    $scope.prePage = $scope.currentPage;
                    $scope.currentPage = num;
                    $scope.pages[$scope.currentPage - 1].active = true;
                    $scope.pages[$scope.prePage - 1].active = false;
                }
            }
            if (token == null) {
                $scope.follow = (profile, element) => {
                    $state.go('signIn')
                }
            } else {
                $scope.follow = (profile, element) => {
                    if ($scope.showFollow == "Edit Profile ") {
                        $state.go('settings')
                    } else {

                        if (profile.following == false) {
                            getAllArticle.followDelete().Follow({
                                UserName: `${$stateParams.username}`
                            }).$promise.then((res) => {
                                $scope.show = true;
                                element.profile.following = res.profile.following;
                            })
                        } else {
                            getAllArticle.followDelete().Delete({
                                UserName: `${$stateParams.username}`
                            }).$promise.then((res) => {
                                $scope.show = false;
                                element.profile.following = res.profile.following;
                            })
                        }
                    }

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
        });
})();