var app = angular.module('ratingApp');

app.factory('facebook', ['$q', '$rootScope', 'User', function ($q, $rootScope, User) {

    function init() {
        var deferred = $q.defer();
        //Facebook Config
        window.fbAsyncInit = function () {
            FB.init({
                appId: 852449401504638,
                cookie: true,
                xfbml: true,
                version: 'v2.3'
            });
            deferred.resolve();
        };

        (function (d) {
            // load the Facebook javascript SDK
            var js,
            id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/sdk.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));

        return deferred.promise;
    }

    function getLoginStatus() {
        var deferred = $q.defer();
        FB.getLoginStatus(function (response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    }

    function logIn() {
        var deferred = $q.defer();
        FB.login(function (response) {
            deferred.resolve(response);
        }, { scope: 'email,user_likes,publish_actions,read_stream,user_friends' });
        return deferred.promise;
    }

    function updateRootUserByFacebookId(facebookId) {
        var deferred = $q.defer();
        //alr connected to facebook, let's check if there is any user in the databse or not
        User.get({ id: facebookId }).$promise
        .then(function (data) {
            $rootScope.user = data;
            deferred.resolve();
        },
        function (error) {
            //cant find this fbID, must be new to the town, let's him join
            if (error.status !== 404) {
                deferred.resolve();
                return;
            }
            $q.all([
                getUserInfo(facebookId),
                getAvatar(facebookId)])
            .then(function (data) {
                var facebookUser = data[0];
                var avatarUrl = data[1];
                $rootScope.user = new User();
                $rootScope.user.facebookId = facebookId;
                $rootScope.user.name = facebookUser.name;
                $rootScope.user.avatarUrl = avatarUrl;
                return $rootScope.user.$save().$promise;
            }).then(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }

    function getUserInfo(userId) {
        var deferred = $q.defer();
        FB.api('/' + userId, function (response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    }

    return {
        init: init,
        getLoginStatus: getLoginStatus,
        getUserInfo: getUserInfo,
        logIn: logIn,
        updateRootUserByFacebookId: updateRootUserByFacebookId
    };
}]);