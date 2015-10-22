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

    function checkCompletion(list) {
        var completed = list.todos.filter(function (todo) {
          return todo.completed;
        });
        list.completed = completed.length === list.todos.length;

        return list;
    }

    $scope.lists = [];
    $scope.errMessages = {
        no_state: 'todo completed state missing',
        no_name: 'todo name missing'
    };

    $scope.find_index = function (list_name) {
        return _.findIndex($scope.lists, {
            name: list_name
        });
    };

    $scope.createList = function (name) {
        $scope.lists.push({
            name: name,
            completed: false,
            todos: [],
            completion_ctr: 0
        });
    };

    $scope.updateListName = function (current_name, new_list_name) {
        $scope.lists[$scope.find_index(current_name)].name = new_list_name;
    };

    $scope.updateListStatus = function (list_name) {
        $scope.arr = $scope.lists[$scope.find_index(list_name)];

        if ($scope.arr.todos.length) {
            $scope.arr.completed = $scope.arr.completed ? false : true;
            _.forEach($scope.arr.todos, function (n, key) {
                n.completed = $scope.arr.completed ? true : false;
            });
        }
    };

    $scope.deleteList = function (list_name) {
        _.remove($scope.lists, function (n, key) {
            return $scope.find_index(list_name) === key;
        });
    };

    $scope.addTodos = function (data1, data2) {
        $scope.lists[0].todos.push(data1, data2);
    };

    $scope.createTodo = function (todo_name, list_pos) {
        $scope.lists[list_pos].todos.push({
            name: todo_name,
            completed: false
        });
    };

    $scope.checkAllTodoStatus = function (data) {
        var ctr = 0;

        _.forEach($scope.lists[0].todos, function (n, key) {
            n.completed = data;

            if (n.completed) {
                ctr++;
            }
        });

        return ctr === $scope.lists[0].todos.length ? 'complete' : 'incomplete';
    };

    $scope.checkDuplicateTodoName = function (name) {
        var temp = [];

        _.forEach($scope.lists, function (a, key) {
            _.forEach(a.todos, function (b, key) {
                temp.push(b);
            });
        });

        return _.findIndex(temp, {
            name: name
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


        c.completed = !c.completed;

        a = checkCompletion(a);
    };

    $scope.removeList = function (name) {
        _.remove($scope.lists, {
            name: name
        });
    };

    $scope.removeTodo = function (name) {
        var ctr = 0;

        _.forEach($scope.lists, function (a, key) {
            if (_.findIndex(a.todos, {
                    name: name
                }) > -1) {
                _.remove(a.todos, {
                    name: name
                });
                ctr++;
            }
        });

        return ctr;
    };

    $scope.markAsCompleted = function (name) {
        $scope.index = $scope.find_index(name);

        if (~$scope.index) {
            $scope.lists[$scope.index].completed = true;
        }
        else {
            throw new Error($scope.errMessages['no_name']);
        }
    };

    $scope.markListAsComplete = function (name) {};

    $scope.markListAsIncomplete = function (name) {};
});

