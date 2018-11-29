(() => {
  var APIURL = "https://conduit.productionready.io/api";
  angular.module("BlogApp")
    .controller("Settings", function ($scope, $http, $window, $state, $rootScope) {
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
        $state.go(`home`);
      };
      $scope.isErr = false;
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
          $window.localStorage.setItem(`username`, res.data.user.username);
          $rootScope.user = $window.localStorage.getItem(`username`);
          $state.go(`profileUser`, { username: res.data.user.username })
        }).catch(function (res) {
          $scope.isErr = true;
          $scope.emailErr = res.data.errors.email;
          $scope.passwordErr = res.data.errors.password;
          $scope.usernameErr = res.data.errors.username;
        });
      };
    });
})();
