(() => {
  angular.module("BlogApp")
    .controller("editor", function ($scope, $http, $window, $state, $stateParams, getAllArticle) {
      var APIURL = "https://conduit.productionready.io/api";
      $scope.isError = false;
      let token = $window.localStorage.getItem(`token`);
      $scope.tagList = new Set();
      $scope.articleTitle = "";
      $scope.subject = "";
      $scope.content = "";
      $scope.tagListn = [];

      $scope.putTag = function () {
        if (!$scope.tagList.has($scope.tags) || $scope.tags !== "") {
          $scope.tagList.add($scope.tags);
        }
        $scope.tags = "";
        $scope.tagListn = [...$scope.tagList];
      };
      $scope.deleteTag = function () {
        if ($scope.tagList.has(this.tag)) {
          $scope.tagList.delete(this.tag);
          $scope.tagListn = [...$scope.tagList];
        }
      };
      var editor = function (method, slug) {
        let data = {
          article: {
            title: $scope.articleTitle,
            description: $scope.subject,
            body: $scope.content,
            tagList: $scope.tagListn
          }
        };
        let req = {
          method: `${method}`,
          data: data,
          url: `${APIURL}/articles/${slug}`,
          headers: { Authorization: `Token ${token}` }
        };

        $http(req)
          .then(function successCallBack(response) {
            $scope.isError = false;
            $scope.articleTitle = "";
            $scope.subject = "";
            $scope.content = "";
            $state.go('article', { slug: response.data.article.slug })
          })
          .catch(function errorCallBack(response) {
            $scope.isError = true;
            $scope.titleErr = response.data.errors.title;
            $scope.bodyErr = response.data.errors.body;
            $scope.descErr = response.data.errors.description;
          });
      }
      if ($stateParams.slug === '') {
        $scope.publish = function () {
          editor('POST', '');
        };
      } else {
        getAllArticle.Article().query({ slug: $stateParams.slug }).$promise.then(res => {
          $scope.articleTitle = res.article.title;
          $scope.subject = res.article.description;
          $scope.content = res.article.body;
          $scope.tagListn = res.article.tagList;
          $scope.tagList = new Set($scope.tagListn);
        });
        $scope.publish = function () {
          editor('PUT', $stateParams.slug)
        }
      }
    });
})();
