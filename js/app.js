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
  $scope.todo_status_ctr = 0;
  $scope.lists = [];
  $scope.errMessages = {
    no_state: 'todo completed state missing',
    no_name: 'todo name missing'
  };

  $scope.find_index = function (list_name) {
    return _.findIndex($scope.lists, {name: list_name});
  };

  $scope.createList = function (name) {
    $scope.lists.push({
      name: name,
      completed: false,
      todos: [],
    });
  };

  $scope.updateListName = function (current_name, new_list_name) {
    $scope.lists[$scope.find_index(current_name)].name = new_list_name;
  };

  $scope.updateListStatus = function (list_name) {
    $scope.arr = $scope.lists[$scope.find_index(list_name)];

    if ($scope.arr.todos.length) {
        $scope.arr.completed = $scope.arr.completed ? false : true;
        _.forEach($scope.arr.todos, function(n, key) {
            n.completed = $scope.arr.completed ? true : false;
        });
    }
  };

  $scope.deleteList = function (list_name) {
    _.remove($scope.lists, function (n, key) {
        return $scope.find_index(list_name) === key;
    });
  };

  $scope.createTodo = function (todo_name, list_pos) {
    $scope.lists[list_pos].todos.push({
        name: todo_name,
        completed: false
    });
  };

  $scope.updateTodoName = function (todo_name, list_name, todo_pos) {
    $scope.lists[$scope.find_index(list_name)].todos[todo_pos].name = todo_name;
  };

  $scope.deleteTodo = function (list_name, todo_pos) {
    var a = $scope.lists[$scope.find_index(list_name)].todos;

    _.remove(a, function (n, key) {
        return todo_pos === key;
    });
  };

  $scope.updateTodoStatus = function (list_name, todo_pos) {
    var a = $scope.lists[$scope.find_index(list_name)],
        b = a.todos,
        c = b[todo_pos];

    c.completed = c.completed ? false : true;

    if (c.completed) {
        $scope.todo_status_ctr++;
    }

    a.completed = $scope.todo_status_ctr === b.length ? 'true' : false;
  };

  $scope.removeList = function (name) {
    _.remove($scope.lists, {
      name: name
    });
  };

  $scope.markAsCompleted = function (name) {
    $scope.index = $scope.find_index(name)

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
