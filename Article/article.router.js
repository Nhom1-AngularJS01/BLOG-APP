(() => {
    angular.module('BlogApp').config(function ($stateProvider) {
        const state = {
            name: 'article',
            url: '/article/:slug',
            templateUrl: 'Article/articlePage.html',
            controller: 'articleController'
        }
        $stateProvider.state(state);
    })
})();
