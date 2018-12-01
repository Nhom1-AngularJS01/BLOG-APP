(() => {
    var baseUrl = 'https://conduit.productionready.io/api';

    angular.module('BlogApp')
        .service('TagsSerive', function ($http) {
            this.getTags = function () {
                return $http.get(`${baseUrl}/tags`)
                    .then(function (response) {
                        return response.data;
                    })
            };
        })

        .service('PreArticalsService', function ($http) {
            this.getArtical = function (limit = 10, offset = 0, tag, token) {
                var url = `${baseUrl}/articles?limit=${limit}&offset=${offset}`;

                if (tag != null) {
                    url = `${baseUrl}/articles?limit=${limit}&offset=${offset}&tag=${tag}`
                }
                if (token != null) {
                    var headers = {
                        'Authorization': `Token ${token}`
                    };
                    return $http.get(`${url}`, { headers: headers })
                        .then(function (response) {
                            return response.data;
                        })
                }
                return $http.get(`${url}`)
                    .then(function (response) {
                        return response.data;
                    })
            }
        })
        .service('YourFeedsService', function ($http) {
            this.getYourFeed = function (limit = 10, offset = 0, token) {
                var url = `${baseUrl}/articles/feed?limit=${limit}&offset=${offset}`;
                var headers = {
                    'Authorization': `Token ${token}`
                }
                return $http.get(`${url}`, { headers: headers })
                    .then(function (response) {
                        return response.data;
                    })
            }
        })
        .service('FavorService', function ($http) {
            this.favorArt = function (slug, token) {
                var url = `${baseUrl}/articles/${slug}/favorite`;
                var headers = {
                    'Authorization': `Token ${token}`
                }
                return $http.post(`${url}`, {}, { headers: headers })
                    .then(function (response) {
                        return response.data;
                    })
            }
            this.unFavorArt = function (slug, token) {
                var url = `${baseUrl}/articles/${slug}/favorite`;
                var headers = {
                    'Authorization': `Token ${token}`
                }
                return $http.delete(`${url}`, { headers: headers })
                    .then(function (response) {
                        return response.data;
                    })
            }
        })
})();
