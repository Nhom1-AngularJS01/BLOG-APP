(() => {
    angular.module('BlogApp').config(function ($stateProvider) {
        const state = [{
            name: 'home',
            url: '/',
            component: 'home'
        },
        {
            name: 'article',
            url: '/article/:slug',
            templateUrl: 'Article/articlePage.html',
            controller: 'articleController'
        },
        {
            name: `signIn`,
            url: `login`,
            templateUrl: `SignIn-SignUp/login.html`,
            controller: "UserSignIn"
        },
        {
            name: `signUp`,
            url: `register`,
            templateUrl: `SignIn-SignUp/register.html`,
            controller: "UserSignUp"
        },
        {
            name: `settings`,
            url: `settings`,
            templateUrl: `Setting/settings.html`,
            controller: `Settings`
        },
        {
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
        },
        {
            name: `newArticle`,
            url: `editor/:slug`,
            templateUrl: `Create-EditArticle/create-editArticle.html`,
            controller: `editor`
        }];
        state.forEach(state => {
            $stateProvider.state(state);
        })
    })
})();
