(() => {
    angular.module('BlogApp').config(function ($stateProvider) {
        const state = [
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
            }];
        state.forEach(state => {
            $stateProvider.state(state);
        })
    })
})();
