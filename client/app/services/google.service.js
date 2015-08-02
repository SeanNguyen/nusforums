var app = angular.module('ratingApp');

app.factory('google', ['$q', '$rootScope', 'User', 'GlobalData', 'UserAuth', '$log', function ($q, $rootScope, User, GlobalData, UserAuth, $log) {
  function init() {
    var deferred = $q.defer();

    // Asynchronously load Google+ SDK
    (function() {
      var po = document.createElement('script');
      po.type = 'text/javascript';
      po.async = true;
      po.src = 'https://apis.google.com/js/client:plusone.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(po, s);
    })();

    return deferred.promise;
  };
  // check if user is logged in
  function getLoginStatus() {
    var deferred = $q.defer();

    // this is retrieve from: http://stackoverflow.com/questions/20922163/google-javascript-api-how-to-detect-user-sign-in-status
    gapi.auth.checkSessionState({session_state: null}, function(isLoggedIn) {
      deferred.resolve(isLoggedIn);
    });

    return deferred.promise;
  };

  function logIn() {
    var deferred = $q.defer();
    var scope = scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    
    gapi.auth.authorize({
      client_id: '575364699605-rhs7mbqvveirn6aiohm81qb2v347rn6d.apps.googleusercontent.com',
      scope: scope,
      immediate: false
    }, function(res) {

      // received token
      deferred.resolve(res);
    });
    return deferred.promise;
  };

  function updateRootUserByGoogleId(googleId) {
    var deferred = $q.defer();

    UserAuth.logInByGoogleId(googleId)
      .then(function(data) {
      	GlobalData.setCurrentUser(data);
      	deferred.resolve();
      })
      .catch(function(err) {
      	getUserProfile()
      	  .then(function(profile) {

      	  	var user;
            user = new User();
      	  	user.googleId = profile.id;
      	  	user.firstName = profile.givenName;
      	  	user.lastName = profile.familyName;
      	  	user.photo = profile.image.url;
      	  	user.email = profile.emails[0].value;
      	  	user.password = 'nopassword';
            user.signUpdate = Date.now();
      	  	user.admin = false;

            user.$save(function(user) {
              deferred.resolve(user);
            }, function() {
              deferred.reject();
            });
      	  });
      });

      return deferred.promise;
  };

  function getUserProfile() {
    var deferred = $q.defer();

    gapi.client.load('plus', 'v1', function() {
      var request = gapi.client.plus.people.get({
    	userId: 'me'
      });

      // retrieved profile with id and image_url
      request.execute(function(resp) {
        deferred.resolve(resp);
      });
    });

    return deferred.promise;
  };

  return {
    init: init,
    getLoginStatus: getLoginStatus,
    getUserProfile: getUserProfile,
    logIn: logIn,
    updateRootUserByGoogleId: updateRootUserByGoogleId
  };
}]);
