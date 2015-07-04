'use-strict';
var app = angular.module('ratingApp');

app.controller('leaderBoardController', function($rootScope, $scope) {
  $scope.userList = [
    {username: 'dishkw',
    nickNameOnline: 'Kuan',
    score: 20
    },
    {username: 'thientran1707',
    nickNameOnline: 'Thien superman',
    score: 20},
    {username: 'johndoe',
    nickNameOnline: 'John Doe',
    score: 10}
  ];
});