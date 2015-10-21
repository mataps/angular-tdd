var app = angular.module('myapp', ['ngRoute']);

app.config(function ($routeProvider) {
    var index = {
        templateUrl: 'todoList.html',
        controller: 'listController'
    };

    $routeProvider
        .when('/', index)
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('listController', function ($scope) {
  $scope.lists = [];
  $scope.errMessages = {
    no_state: 'todo completed state missing',
    no_name: 'todo name missing',
    no_address: 'todo address missing'
  };

  $scope.createList = function (name) {
    console.log("name", name);
    if(name) {
      $scope.lists.push({
        name: name,
        status: 'Ongoing',
        completed: false
      });
    }

  };

  $scope.updateStatus = function(e) {
    console.log("e",e.status);
  };

  $scope.removeList = function (name) {
    _.remove($scope.lists, {
      name: name
    });
  };

  $scope.markAsCompleted = function (name) {
    $scope.index = _.findIndex($scope.lists, {name: name});

    if (~$scope.index) {
        $scope.lists[$scope.index].completed = true;
    }
    else {
        throw new Error($scope.errMessages['no_name']);
    }
  };

  $scope.markListAsComplete = function (name) {
  };

  $scope.markListAsIncomplete = function (name) {
  };
});
