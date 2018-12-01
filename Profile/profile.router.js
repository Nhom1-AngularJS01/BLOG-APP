(() => {
    angular.module('BlogApp').config(function ($stateProvider) {
        const state = [{
            name: "profileUser",
            url: "/@:username",
            templateUrl: "Profile/profileUser.html",
            controller: "ProfileUser"
        },
        {
            name: "profileUser.myAticle",
            url: "/favorites",
            templateUrl: "Profile/profileAticles.html",
            controller: "FavoritedAticles"
        }];
        state.forEach(state => {
            $stateProvider.state(state);
        })
    })
})();
