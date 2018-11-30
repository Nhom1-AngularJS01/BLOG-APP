(() => {
  var APIURL = "https://conduit.productionready.io/api";
  angular.module("BlogApp")
    .controller("UserSignIn", function ($scope, $http, $window, $state, $rootScope) {
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
            $window.localStorage.setItem(`token`, response.data.user.token);
            $window.localStorage.setItem(`username`, response.data.user.username);
            $rootScope.isHeader = true;
            $rootScope.user = response.data.user.username;
            $state.go(`home`);
          })
          .catch(function (response) {
            $scope.isInvisible = true;
          });
      };
    })
    .controller("UserSignUp", function ($scope, $http, $window, $state) {
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
            $scope.isError = true;
            $scope.emailErr = response.data.errors.email;
            $scope.passwordErr = response.data.errors.password;
            $scope.usernameErr = response.data.errors.username;
          });
      };
    });
})();
