(() => {
  var services = angular.module('article', []);
  var APIUrl = 'https://conduit.productionready.io/api';
  
  services.factory('getAllArticle', function ($resource,$window) {

    let token='Token '+$window.localStorage.getItem('token')
    
    return {
      article:function () {
        return $resource(
          APIUrl + '/articles/:slug', {}, {
            'query': {
              method: 'GET',
              params: {
                slug: '@slug'
              },
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `${token}`
              }
            },
            'queryNotToken': {
              method: 'GET',
              params: {
                slug: '@slug'
              },
            },
            'delete':{
                method: 'DELETE',
                params: {
                  slug: '@slug'
                },
                headers: {
                  'Accept': 'application/json',
                  "Content-Type": "application/json",
                  "Authorization": `${token}`
                }
            },  
          }
        );
      },
      getComments:function () {
        return $resource(
          APIUrl + '/articles/:slug/comments', {}, {
            'query': {
              method: 'GET',
              params: {
                slug: '@slug'
              }
            },
            'add': {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `${token}`
              }
            }
          }
        )
      },
      getFavorite:function () {
        return $resource(
          APIUrl + '/articles/:slug/favorite', {}, {
            'post': {
              method: 'POST',
              params: {
                slug: '@slug'
              },
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `${token}`
              }
            },
            'delete': {
              method: 'DELETE',
              params: {
                slug: '@slug'
              },
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `${token}`
              }
            }
          }
        )
      },
      getFollowing:function () {
        return $resource(
          APIUrl + '/profiles/:UserName', {}, {
            'following': {
              method: 'GET',
              params: {
                UserName: '@UserName'
              },
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `${token}`
              }
            },
          }
        )
      },
      followDelete:function(){
        return $resource(
          APIUrl + '/profiles/:UserName/follow', {}, {
            'follow': {
              method: 'POST',
              params: {
                UserName: '@UserName'
              },
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `${token}`
              }
            },
            'delete': {
              method: 'DELETE',
              params: {
                UserName: '@UserName'
              },
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `${token}`
              }
            },
          }
        );
      },
      deleteComment:function () {
        return $resource(
          APIUrl + '/articles/:slug/comments/:id', {}, {
            'delete': {
              method: 'DELETE',
              params: {
                UserName: '@UserName',
                id: '@id'
              },
              headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `${token}`
              }
            },
          }
        );
      }
    }
  });
})();