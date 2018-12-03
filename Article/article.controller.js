(() => {
    angular.module("BlogApp")
        .controller('articleController', [
            '$scope',
            'getAllArticle',
            '$window',
            '$state',
            '$stateParams',
            function ($scope, getAllArticle, $window, $state, $stateParams) {
                let token = $window.localStorage.getItem('token')
                let slug = $stateParams.slug;
                $scope.myUser = $window.localStorage.getItem('username');
                $scope.cmt = '';
                function getAllComment() {
                    getAllArticle.getComments().query({
                        slug: `${slug}`
                    }).$promise.then((comment) => {
                        $scope.comments = comment.comments;
                        $scope.comments.map((comment) => {
                            if (comment.author.username == $scope.myUser) {
                                return comment.ismyComment = true;
                            }
                        })
                    })
                }
                if (token == null) {
                    getAllArticle.article().queryNotToken({
                        slug: `${slug}`
                    }).$promise.then((user) => {
                        $scope.article = user.article;
                        $scope.favoritesCount = user.article.favoritesCount;
                    })
                    getAllArticle.getComments().query({
                        slug: `${slug}`
                    }).$promise.then((comment) => {
                        $scope.comments = comment.comments;
                    })
                } else {
                    getAllArticle.article().query({
                        slug: `${slug}`
                    }).$promise.then((user) => {
                        $scope.article = user.article;
                        $scope.favoritesCount = user.article.favoritesCount;
                        userArticle = $scope.article.author.username;
                        if (userArticle == $scope.myUser) {
                            $scope.isActicle = true;
                        } else $scope.isActicle = false;
                        if ($scope.article.favorited == true) {
                            $scope.Favorite = true;
                        } else $scope.Favorite = false;
                        getAllArticle.getFollowing().following({
                            UserName: `${userArticle}`
                        }).$promise.then((post) => {
                            isFollow = post.profile.following;
                            if (isFollow == false) {
                                $scope.show = false;
                            } else $scope.show = true;
                        })
                    })
                    getAllComment();
                }
                if (token == null) {
                    $scope.follow = (article, element) => {
                        $state.go('signIn')
                    }
                } else {
                    $scope.follow = (article, element) => {
                        if (article.author.following == false) {
                            getAllArticle.followDelete().follow({
                                UserName: `${userArticle}`
                            }).$promise.then((res) => {
                                $scope.show = true;
                                element.article.author.following = res.profile.following;
                            })
                        } else {
                            getAllArticle.followDelete().delete({
                                UserName: `${userArticle}`
                            }).$promise.then((res) => {
                                $scope.show = false;
                                element.article.author.following = res.profile.following;
                            })
                        }
                    }
                }
                if (token == null) {
                    $scope.favorites = (article, element) => {
                        $state.go('signIn')
                    }
                } else {
                    $scope.favorites = (article, element) => {
                        if (article.favorited == true) {
                            getAllArticle.getFavorite().delete({
                                slug: `${slug}`
                            }).$promise.then((res) => {
                                element.article.favorited = res.article.favorited;
                                $scope.Favorite = false;
                                $scope.favoritesCount = res.article.favoritesCount;
                            })
                        } else {
                            getAllArticle.getFavorite().post({
                                slug: `${slug}`
                            }).$promise.then((res) => {
                                element.article.favorited = res.article.favorited;
                                $scope.Favorite = true;
                                $scope.favoritesCount = res.article.favoritesCount;
                            })
                        }
                    }
                }
                if (token == null) {
                    $scope.isLogin = false
                } else {
                    $scope.isLogin = true;
                }
                $scope.postComment = () => {
                    getAllArticle.getComments().add({
                        slug: `${slug}`
                    },
                        {
                            comment: {
                                body: $scope.cmt
                            }
                        }).$promise.then(() => {
                            $scope.cmt = '';
                            getAllComment();
                        })
                        .catch((res) => {
                            $scope.errors = res.data.errors.body;
                        })
                }
                $scope.deleteCb = (id) => {
                    getAllArticle.deleteComment().delete({
                        slug: `${slug}`,
                        id: `${id}`
                    }).$promise.then(() => {
                        getAllComment();
                    })
                }
                $scope.deleteArticle = () => {
                    getAllArticle.article().delete({
                        slug: `${slug}`
                    }).$promise.then(() => {
                        $state.go('home')
                    })
                }
            }
        ])
})();

