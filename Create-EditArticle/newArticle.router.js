(() => {
    angular.module('BlogApp').config(function ($stateProvider) {
        const state = {
            name: `newArticle`,
            url: `editor/:slug`,
            templateUrl: `Create-EditArticle/create-editArticle.html`,
            controller: `editor`
        }
        $stateProvider.state(state);
    })
})();
