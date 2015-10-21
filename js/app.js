var app = angular.module('myapp', []);

app.controller('listController', function ($scope) {
  $scope.lists = [];

  $scope.createList = function (name) {
    $scope.lists.push({
      name: name,
      completed: false
    });
  };

  $scope.removeList = function (name) {
    _.remove($scope.lists, {
      name: name
    });
  };

  $scope.markListAsComplete = function (name) {
  };

  $scope.markListAsIncomplete = function (name) {
  };
});
