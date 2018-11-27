  // var app = angular.module(`BlogApp`);

  app.config(function($stateProvider) {
    // $stateProvider.state({
    //   name: `home`,
    //   url: `home`,
    //   templateUrl: `templates/home.html`
    // });

    $stateProvider.state({
      name: `signIn`,
      url: `login`,
      templateUrl: `templates/login.html`,
      controller: "UserSignIn"
    });

    $stateProvider.state({
      name: `signUp`,
      url: `register`,
      templateUrl: `templates/register.html`,
      controller: "UserSignUp"
    });

    $stateProvider.state({
      name: `settings`,
      url: `settings`,
      templateUrl: `templates/settings.html`,
      controller: `Settings`
    });
  });
