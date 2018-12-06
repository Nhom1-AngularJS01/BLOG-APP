(() => {
  var APIURL = "https://conduit.productionready.io/api";
  angular
    .module("BlogApp")
    .controller("Settings", function(
      $scope,
      $http,
      $window,
      $state,
      $rootScope
    ) {
      let token = $window.localStorage.getItem(`token`);
      let req = {
        method: `GET`,
        url: `${APIURL}/user`,
        headers: { Authorization: `Token ${token}` }
      };
      $http(req).then(function(response) {
        let data = response.data.user;
        $scope.username = data.username;
        $scope.email = data.email;
      });
      $scope.logOut = function() {
        $window.localStorage.removeItem(`token`);
        $window.localStorage.removeItem(`username`);
        $rootScope.isHeader = false;
        $rootScope.user = undefined;
        $state.go(`home`);
      };
      $scope.isErr = false;
      $scope.hideMe = false;
      $scope.update = function() {
        let data = {
          user: {
            username: $scope.username || "",
            password: $scope.password || "",
            email: $scope.email || "",
            bio: $scope.bio || null,
            image: $scope.url || null
          }
        };
        let req = {
          method: "PUT",
          data: data,
          url: `${APIURL}/user`,
          headers: { Authorization: `Token ${token}` }
        };

        $http(req)
          .then(function(res) {
            $window.localStorage.setItem(`username`, res.data.user.username);
            $rootScope.user = $window.localStorage.getItem(`username`);
            alert("Update successfully !");
            $state.go(`profileUser`, { username: res.data.user.username });
          })
          .catch(function(res) {
            $scope.isErr = true;
            $scope.hideMe = true;
            alert("Update unsuccessfully !");
            $scope.emailErr = res.data.errors.email;
            $scope.passwordErr = res.data.errors.password;
            $scope.usernameErr = res.data.errors.username;
          });
      };
    });
})();
