(() => {
    angular.module("BlogApp")
        .controller('controller', function ($state, $rootScope, $scope, $window) {
            $rootScope.user = $window.localStorage.getItem(`username`);
            if ($rootScope.user == undefined) {
                $rootScope.isHeader = false;
            } else {
                $rootScope.isHeader = true;
            }
            $state.go('home');
        })
        .controller('homeController', ['$scope', 'TagsSerive', 'PreArticalsService', '$rootScope', 'YourFeedsService', 'FavorService', '$window', '$state', function ($scope, TagsSerive, PreArticalsService, $rootScope, YourFeedsService, FavorService, $window, $state) {
            var token = $window.localStorage.getItem(`token`);
            $scope.myTag = false;
            $scope.tagSelect = '';
            $scope.currentPage = 1;
            $scope.prePage = 1;
            $scope.itemsPerPage = 10;
            $scope.hasTag = 0;
            var init = function () {
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
                } else if ($scope.totalItems <= 10) {
                    $scope.notMyArticle = false;
                    $scope.paginationShow = false;
                } else {
                    $scope.notMyArticle = false;
                    $scope.paginationShow = true;
                }
            }

            if ($rootScope.user == null) {
                $scope.hasYour = 0;
                $scope.feed = false;
                $scope.show = false;
                $scope.isGlobal = true;
                $scope.myTag = false;
                PreArticalsService.getArtical(10, 0, null, token).then(function (res) {
                    $scope.articals = res.articles;
                    $scope.totalItems = res.articlesCount;
                    $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
                    init();
                })
            } else {
                $scope.feed = true;
                $scope.show = true;
                $scope.isGlobal = false;
                $scope.myTag = false;
                $scope.hasYour = 1;
                YourFeedsService.getYourFeed(10, 0, token).then(function (res) {
                    $scope.articals = res.articles;
                    $scope.totalItems = res.articlesCount;
                    $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
                    init();
                });
            }

            TagsSerive.getTags().then(function (res) {
                $scope.tags = res.tags;
            });

            $scope.changePage = function (num) {
                if (num != $scope.currentPage) {
                    $scope.prePage = $scope.currentPage;
                    $scope.currentPage = num;
                    $scope.pages[$scope.currentPage - 1].active = true;
                    $scope.pages[$scope.prePage - 1].active = false;

                    if ($scope.hasTag == 0 && $scope.hasYour == 0) {
                        PreArticalsService.getArtical(10, (num - 1) * 10, null, token).then(function (res) {
                            $scope.articals = res.articles;
                            $scope.totalItems = res.articlesCount;
                        });
                    } else if ($scope.hasYour == 1) {
                        YourFeedsService.getYourFeed(10, (num - 1) * 10, token).then(function (res) {
                            $scope.articals = res.articles;
                            $scope.totalItems = res.articlesCount;
                        });
                    } else {
                        PreArticalsService.getArtical(10, (num - 1) * 10, $scope.tagSelect, token).then(function (res) {
                            $scope.articals = res.articles;
                            $scope.totalItems = res.articlesCount;
                        });
                    }
                }
            }
            $scope.globalFeed = function () {
                $scope.hasTag = 0;
                $scope.hasYour = 0;
                $scope.myTag = false;
                $scope.isGlobal = true;
                $scope.feed = false;

                PreArticalsService.getArtical(10, 0, null, token).then(function (res) {
                    $scope.articals = res.articles;
                    $scope.totalItems = res.articlesCount;
                    $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
                    $scope.currentPage = 1;
                    init();
                    $scope.prePage = 1;
                });
            }

            $scope.yourFeed = function () {
                $scope.hasTag = 0;
                $scope.hasYour = 1;
                $scope.myTag = false;
                $scope.isGlobal = false;
                $scope.feed = true;

                YourFeedsService.getYourFeed(10, 0, token).then(function (res) {
                    $scope.articals = res.articles;
                    $scope.totalItems = res.articlesCount;
                    $scope.currentPage = 1;
                    $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
                    init();
                    $scope.prePage = 1;
                });
            }
            $scope.clickTag = function (tag) {
                $scope.hasTag = 1;
                $scope.hasYour = 0;
                $scope.tagSelect = tag;
                $scope.myTag = true;
                $scope.isGlobal = false;
                $scope.feed = false;

                PreArticalsService.getArtical(10, 0, tag, token).then(function (res) {
                    $scope.articals = res.articles;
                    $scope.totalItems = res.articlesCount;
                    $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
                    $scope.currentPage = 1;
                    init();
                    $scope.prePage = 1;
                });
            }
            $scope.submit = function (art, element) {
                if ($rootScope.user != undefined) {
                    if (!art.favorited) {
                        FavorService.favorArt(art.slug, token).then(function (res) {
                            element.art = res.article;
                        })
                    } else {
                        FavorService.unFavorArt(art.slug, token).then(function (res) {
                            element.art = res.article;
                        })
                    }
                } else {
                    $state.go('signIn');
                }
            }
        }])
})();
