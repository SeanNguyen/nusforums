var app = angular.module('ratingApp');

app.factory('facebook', ['$q', '$rootScope', 'User', 'GlobalData', 'UserAuth', '$log', function ($q, $rootScope, User, GlobalData, UserAuth,$log) {

    function init() {
        var deferred = $q.defer();

        //Facebook Config
        window.fbAsyncInit = function() {
            FB.init({
              appId      : '432828713591059',
              xfbml      : true,
              version    : 'v2.4'
            });
            deferred.resolve();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        return deferred.promise;
    }

    function getLoginStatus() {
        var deferred = $q.defer();
        FB.getLoginStatus(function (response) {
            deferred.resolve(response);
        }, {scope: 'public_profile,email'});
        return deferred.promise;
    }

    function logIn() {
        var deferred = $q.defer();
        FB.login(function (response) {
            deferred.resolve(response);
        }, { scope: 'email,user_friends' });
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
                
                //create an user by facebook data
                var user = new User();
                
                user.facebookId = facebookId;
                user.email = facebookUser.email;
                user.password = 'nopassword';
                
                user.role = 1; //this has no meaning
                user.admin = false;


                user.firstName = facebookUser.first_name;
                user.middleName = facebookUser.middle_name;
                user.lastName = facebookUser.last_name;
                
                user.gender = facebookUser.gender;
                user.photo = avatarUrl;

                user.signupDate = moment().format("YY-MM-DD HH:MM:ss");

                //then save it
                user.$save(function(user) {
                    deferred.resolve(user);
                }, function(err) {
                    deferred.reject(err);
                });
            });
        });
        return deferred.promise;
    }

    function getUserInfo(userId) {
        var deferred = $q.defer();
        var fields = 'id,name,first_name,middle_name,last_name,email,gender,age_range'
        FB.api('/' + userId + '?fields=' + fields, function (response) {
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