  // var services = angular.module("BlogApp", ["ngResource"]);

  // var baseUrl = "https://conduit.productionready.io/api";

  app.factory("logInFactory", function($resource){
    return $resource(
      baseUrl + "/users/login",
      {},
      {
        query:{method : 'POST'}
      }
      );

  })

  
