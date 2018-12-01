(() => {
    angular.module('BlogApp').config(function ($stateProvider) {
        const state = {
            name: 'home',
            url: '/',
            component: 'home'
        };
        $stateProvider.state(state);
    })
})();
