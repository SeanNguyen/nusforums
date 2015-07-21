var app = angular.module('ratingApp');

app.factory('facebook', ['$q', '$rootScope', 'User', 'GlobalData', 'UserAuth', function ($q, $rootScope, User, GlobalData, UserAuth) {

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
        });
        return deferred.promise;
    }

    function updateRootUserByFacebookId(facebookId) {
        var deferred = $q.defer();
        //alr connected to facebook, let's check if there is any user in the databse or not
        UserAuth.logInByFacebookId(facebookId)
        .then(function (data) {
            GlobalData.setCurrentUser(data);
            deferred.resolve();
        })
        .catch(function (error) {
            //cant find this fbID, must be new to the town, let's him join
            $q.all([
                getUserInfo(facebookId),
                getAvatar(facebookId)])
            .then(function (data) {
                var facebookUser = data[0];
                var avatarUrl = data[1];
                var user;
                user = new User();
                user.facebookId = facebookId;
                user.firstName = facebookUser.firstName;
                user.middleName = facebookUser.middleName;
                user.lastName = facebookUser.lastName;
                user.photo = facebookUser.avatarUrl;
                user.email = facebookUser.email;

                return user.$save().$promise;
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

    function getAvatar(facebookId) {
        var deferred = $q.defer();
        FB.api(
            "/" + facebookId + "/picture",
            { height: 200, width: 200 },
            function (response) {
                if (response && !response.error) {
                    deferred.resolve(response.data.url);
                } else {
                    console.log("Get facebook avatar fail");
                    deferred.reject();
                }
            }
        );
        return deferred.promise;
    }

    return {
        init: init,
        getLoginStatus: getLoginStatus,
        getUserInfo: getUserInfo,
        getAvatar: getAvatar,
        logIn: logIn,
        updateRootUserByFacebookId: updateRootUserByFacebookId
    };
}]);