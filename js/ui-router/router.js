app.config(function ($stateProvider) {
    const state = [{
        name: 'home',
        url: '/',
        component: 'home'
    },
    {
        name: 'article',
        url: '/article/:slug',
        templateUrl: 'templates/articlePage.html',
        controller: 'articleController'
    },
    {
        name: `signIn`,
        url: `login`,
        templateUrl: `templates/login.html`,
        controller: "UserSignIn"
    },
    {
        name: `signUp`,
        url: `register`,
        templateUrl: `templates/register.html`,
        controller: "UserSignUp"
    },
    {
        name: `settings`,
        url: `settings`,
        templateUrl: `templates/settings.html`,
        controller: `Settings`
    },
    {
        name: "profileUser",
        url: "/@:username",
        templateUrl: "templates/profileUser.html",
        controller: "ProfileUser"
    },
    {
        name: "profileUser.myAticle",
        url: "/favorites",
        templateUrl: "templates/profileAticles.html",
        controller: "FavoritedAticles"
    },
    {
        name: `newArticle`,
        url: `editor/:slug`,
        templateUrl: `templates/create-editArticle.html`,
        controller: `editor`
      }
    ];
    state.forEach(state => {
        $stateProvider.state(state);
    })
})
