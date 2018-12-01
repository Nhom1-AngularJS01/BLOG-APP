(() => {
    angular.module('BlogApp').config(function ($stateProvider) {
        const state = {
            name: `settings`,
            url: `settings`,
            templateUrl: `Setting/settings.html`,
            controller: `Settings`
        };
        $stateProvider.state(state);
    })
})();
