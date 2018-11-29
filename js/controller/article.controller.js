app.controller('articleController', [
    '$scope',
    'getAllArticle',
    '$window',
    '$state',
    '$stateParams',
    function ($scope, getAllArticle, $window, $state, $stateParams) {
        
        let token = $window.localStorage.getItem('token')
        let slug = $stateParams.slug;
        $scope.myuser = $window.localStorage.getItem('username');

        function GETcomment() {
            getAllArticle.getComments().query({
                slug: `${slug}`
            }).$promise.then((comment) => {
                $scope.comments = comment.comments;
                $scope.comments.map((comment) => {
                    if (comment.author.username == $scope.myuser) {
                        return comment.ismyComment = true;
                    }
                })
            })
        }


        if (token == null) {
            getAllArticle.Article().queryNotToken({
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
            getAllArticle.Article().query({
                slug: `${slug}`
            }).$promise.then((user) => {
                $scope.article = user.article;
                $scope.favoritesCount = user.article.favoritesCount;
                userArticle = $scope.article.author.username;
                if (userArticle == $scope.myuser) {
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
            GETcomment();
        }
        if (token == null) {
            $scope.follow = (article, element) => {
                $state.go('signIn')
            }
        } else {
            $scope.follow = (article, element) => {
            

                if (article.author.following == false) {
                    getAllArticle.followDelete().Follow({
                        UserName: `${userArticle}`
                    }).$promise.then((res) => {
                        $scope.show = true;
                        element.article.author.following = res.profile.following;

                    })
                } else {
                    getAllArticle.followDelete().Delete({
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
                    getAllArticle.getFavorite().Delete({
                        slug: `${slug}`
                    }).$promise.then((res) => {
                        element.article.favorited = res.article.favorited;
                        $scope.Favorite = false;
                        $scope.favoritesCount = res.article.favoritesCount;

                    })
                } else {
                    getAllArticle.getFavorite().Post({
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
                slug: `${slug}`},
                {comment: {
                    body: $scope.arena
                }
            }).$promise.then(() => {
                $scope.arena = '';
                GETcomment();
            })
        }
        $scope.deleteCb = (id) => {
            getAllArticle.Deletecomment().Delete({
                slug: `${slug}`,
                id: `${id}`
            }).$promise.then(() => {
                GETcomment();
            })
        }
        $scope.deleteArticle = () => {
            getAllArticle.Article().Delete({
                slug: `${slug}`
            }).$promise.then(() => {
                $state.go('home')
            })
        }
    }
])