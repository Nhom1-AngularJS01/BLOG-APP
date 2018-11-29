app.controller('controller', function ($state, $rootScope, $scope, $window) {
    $rootScope.user = $window.localStorage.getItem(`username`);
    if ($rootScope.user == undefined) {
        $rootScope.isHeader = false;
    } else {
        $rootScope.isHeader = true;
    }
    $state.go('home');
})
app.controller('homeController', ['$scope', 'TagsSerive', 'PreArticalsService', '$rootScope', 'YourFeedsService', 'FavorService', '$window','$state', function ($scope, TagsSerive, PreArticalsService, $rootScope, YourFeedsService, FavorService, $window, $state) {
    var token = $window.localStorage.getItem(`token`);
    console.log(token);
    $scope.myTag = false;
    $scope.tagSelect = '';
    var tagDisplay;
    var yourFe;
    var page;
    $scope.hasTag = 0;
    if ($rootScope.user == null) {
        $scope.hasYour = 0;
        $scope.feed = true;
        $scope.isGlobal = true;
        PreArticalsService.getArtical().then(function (res) {
            $scope.articals = res.articles;
            $scope.totalItems = res.articlesCount;
        });
    } else {
        $scope.feed = false;
        $scope.isGlobal = false;
        $scope.hasYour = 1;
        yourFe = document.querySelector('#yourFe');
        yourFe.style.color = 'rgb(131, 233, 131)';
        YourFeedsService.getYourFeed(10, 0, token).then(function (res) {
            console.log(res);
            $scope.articals = res.articles;
            $scope.totalItems = res.articlesCount;
            $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
        });
    }
    TagsSerive.getTags().then(function (res) {
        $scope.tags = res.tags;
    });
    $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
    $scope.currentPage = 1;
    $scope.previousPage = 1;
    $scope.itemsPerPage = 10;
    tagDisplay = document.getElementById("tag");
    yourFe = document.querySelector('#yourFe');
    window.addEventListener('load', function () {
        page = document.getElementsByClassName('pagination-page');
        page[1].getElementsByTagName('a')[0].style.background = '#5CB85C';
        page[1].getElementsByTagName('a')[0].style.color = 'white';
    })
    var activePage = function () {
        page = document.getElementsByClassName('pagination-page');
        page[$scope.currentPage].getElementsByTagName('a')[0].style.background = '#5CB85C';
        page[$scope.currentPage].getElementsByTagName('a')[0].style.color = 'white';
        if (!($scope.currentPage === 1 && $scope.previousPage === 1)) {
            page[$scope.previousPage].getElementsByTagName('a')[0].style.background = 'white';
            page[$scope.previousPage].getElementsByTagName('a')[0].style.color = 'black';
        }
    }
    $scope.changePage = function () {
        console.log($scope.currentPage);
        activePage();
        if ($scope.hasTag == 0 && $scope.hasYour == 0) {
            PreArticalsService.getArtical(10, ($scope.currentPage - 1) * 10).then(function (res) {
                $scope.articals = res.articles;
                $scope.totalItems = res.articlesCount;
            });
        } else if ($scope.hasYour == 1) {
            YourFeedsService.getYourFeed(10, ($scope.currentPage - 1) * 10, token).then(function (res) {
                $scope.articals = res.articles;
            });
        } else {
            PreArticalsService.getArtical(10, ($scope.currentPage - 1) * 10, $scope.tagSelect).then(function (res) {
                $scope.articals = res.articles;
                $scope.totalItems = res.articlesCount;
            });
        }
        $scope.previousPage = $scope.currentPage;
    }
    $scope.globalFeed = function () {
        $scope.hasTag = 0;
        $scope.hasYour = 0;
        $scope.myTag = false;
        $scope.isGlobal = true;
        tagDisplay.style.display = 'none';
        yourFe.style.color = 'grey';

        PreArticalsService.getArtical().then(function (res) {
            $scope.articals = res.articles;
            $scope.totalItems = res.articlesCount;
            $scope.currentPage = 1;
            activePage();
            $scope.previousPage = 1;
        });
    }

    $scope.yourFeed = function () {
        tagDisplay.style.display = 'none';
        $scope.hasTag = 0;
        $scope.hasYour = 1;
        $scope.isGlobal = false;
        yourFe.style.color = 'rgb(131, 233, 131)';
        YourFeedsService.getYourFeed(10, 0, token).then(function (res) {
            $scope.articals = res.articles;
            $scope.totalItems = res.articlesCount;
            $scope.currentPage = 1;
            $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
            activePage(); $scope.previousPage = 1;
        });
    }
    $scope.clickTag = function (tag) {
        $scope.hasTag = 1;
        $scope.hasYour = 0;
        $scope.tagSelect = tag;
        tagDisplay.style.display = 'block';

        $scope.myTag = true;
        $scope.isGlobal = false;
        yourFe.style.color = 'grey';

        PreArticalsService.getArtical(10, 0, tag).then(function (res) {
            $scope.articals = res.articles;
            $scope.totalItems = res.articlesCount;
            $scope.numPages = $scope.totalItems / $scope.itemsPerPage;
            $scope.currentPage = 1;
            activePage(); $scope.previousPage = 1;

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
        } else{
            $state.go('signIn');
        }
    }
}])