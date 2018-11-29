(() => {
  var services = angular.module('article', []);
  var APIUrl = 'https://conduit.productionready.io/api';
  
  services.factory('getAllArticle', function ($resource,$window) {

    let token='Token '+$window.localStorage.getItem('token')
    
    return {
      Article:function () {
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
            'Delete':{
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
            'Post': {
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
            'Delete': {
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
            'Follow': {
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
            'Delete': {
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
      Deletecomment:function () {
        return $resource(
          APIUrl + '/articles/:slug/comments/:id', {}, {
            'Delete': {
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