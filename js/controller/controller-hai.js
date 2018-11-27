// var app = angular.module("BlogApp");
var APIURL = "https://conduit.productionready.io/api";

app.controller("UserSignIn", function ($scope, $http, $window, $state) {
  // $scope.visible = true;
  $scope.logIn = function () {
    let email = $scope.email;
    let password = $scope.password;
    let req = {
      method: `POST`,
      data: { user: { email: `${email}`, password: `${password}` } },
      url: `${APIURL}/users/login`
    };
    $scope.isInvisible = false;

    $http(req)
      .then(function (response) {
        $scope.visible = true;
        console.log($scope.visible);
        $window.localStorage.setItem(`token`, response.data.user.token);
        $window.localStorage.setItem(`username`, response.data.user.username);
        $state.go(`home`);
      })
      .catch(function (response) {
        $scope.isInvisible = true;
      });
  };
});

app.controller("UserSignUp", function ($scope, $http, $window, $state) {
  $scope.isError = false;

  $scope.register = function () {
    let data = {
      user: {
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      }
    };
    let req = {
      method: `POST`,
      data: data,
      url: `${APIURL}/users`
    };
    $http(req)
      .then(function (response) {
        let data = response.data.user;
        $window.localStorage.setItem(`token`, data.token);
        $window.localStorage.setItem(`username`, data.username);
        $state.go(`home`);
      })
      .catch(function (response) {
        console.log(response.data.errors);
        $scope.isError = true;
        $scope.emailErr = response.data.errors.email;
        $scope.passwordErr = response.data.errors.password;
        $scope.usernameErr = response.data.errors.username;
      });
  };

});

app.controller("Settings", function ($scope, $http, $window, $state, $rootScope) {
  let token = $window.localStorage.getItem(`token`);
  console.log(token);
  let req = {
    method: `GET`,
    url: `${APIURL}/user`,
    headers: { Authorization: `Token ${token}` }
  };
  $http(req).then(function (response) {
    let data = response.data.user;
    $scope.username = data.username;
    $scope.email = data.email;
  });

  $scope.logOut = function () {
    $window.localStorage.removeItem(`token`);
    $window.localStorage.removeItem(`username`);
    $rootScope.isHeader = false;
    $rootScope.user = undefined;
    console.log($rootScope.isHeader);
    // $rootScope.$apply();
    $state.go(`home`);
  };

  $scope.update = function () {
    let data = {
      user: {
        username: $scope.username,
        password: $scope.password,
        email: $scope.email,
        bio: $scope.bio,
        image: $scope.url
      }
    };

    let req = {
      method: "PUT",
      data: data,
      url: `${APIURL}/user`,
      headers: { Authorization: `Token ${token}` }
    };
    $http(req).then(function (res) {
      console.log(res);
    });
  };
});
