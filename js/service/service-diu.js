var baseUrl = 'https://conduit.productionready.io/api';

app.service('UserService', function ($http) {
    this.getUser = function (data) {
        var user;
        return $http.post(`${baseUrl}/users/login`, data).then(function (res) {
            user = res.data;

            return {
                username: user.user.username,
                image: user.user.image,
                token: user.user.token,
                status: res.status
            }
        }, function (res) {
            return res;
        })

    }
})

app.service('TagsSerive', function ($http) {
    this.getTags = function () {
        return $http.get(`${baseUrl}/tags`)
            .then(function (response) {
                return response.data;
            })
    };
});

app.service('PreArticalsService', function ($http) {
    this.getArtical = function (limit = 10, offset = 0, tag) {
        var url = `${baseUrl}/articles?limit=${limit}&offset=${offset}`;
        if (tag != undefined) {
            url = `${baseUrl}/articles?limit=${limit}&offset=${offset}&tag=${tag}`
        }
        return $http.get(`${url}`)
            .then(function (response) {
                return response.data;
            })
    }
});
app.service('YourFeedsService', function ($http) {
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
});
app.service('FavorService', function ($http) {
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