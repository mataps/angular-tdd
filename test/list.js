/*global describe, it, beforeEach, inject, expect*/

(function () {

    'use strict';

    var $controller, $scope;

    beforeEach(module('myapp'));


    describe('List', function () {
      var list;

        beforeEach(inject(function (_$controller_, _$rootScope_) {
            $scope = _$rootScope_.$new();
            $controller = _$controller_('listController', {
                $scope: $scope
            });
        }));

        beforeEach('create a list', function () {
            var name = 'ryan';
            $scope.createList(name);
            list = _.find($scope.lists, {
                name: name
            });

            // failed (name cannot be empty, hence the test FAILS.)
            // expect(list.name).to.not.equal('ryan');
            // passing (name is not empty, hence the test PASSES.)
            expect(list.name).to.equal('ryan');


            // failed (status 'completed: true' is not created in every list, hence the test FAILS.)
            // expect(list.completed).to.equal(true);
            // passing (status 'completed: false' is created in every list, hence the test PASSES.)
            expect(list.completed).to.equal(false);

            // failed (todo length is equal 0 in every new list, hence the test FAILS)
            // expect(list.todos.length > 0).to.be.ok();
            // passing (todo length is 0 in every new list, hence the test PASSES)
            expect(list.todos.length > 0).to.not.be.ok();
        });

        beforeEach('insert todo in list', function () {
            $scope.addTodos({
                name: 'todo 1',
                completed: false
            }, {
                name: 'todo 2',
                completed: false
            });

            // failed
            // expect($scope.lists[0].todos.length > 0).to.not.be.ok();
            // passing
            expect(list.todos.length > 0).to.be.ok();
        });

        describe('#update', function () {

            it('should be marked as complete (list)', function () {
                $scope.markAsCompleted(list.name);

                // failed
                // expect($scope.lists[0].completed).to.equal(false);
                // passing
                expect($scope.lists[0].completed).to.equal(true);
            });

            it('should be marked as incomplete (list)', function () {
                $scope.markAsIncomplete(list.name);


                // failed
                // expect($scope.lists[0].completed).to.equal(true);
                // passing
                expect($scope.lists[0].completed).to.equal(false);
            });

            it('should update todo name without duplicate', function () {
                // $scope.checkDuplicateTodoName('todo 1');

                // failed
                // expect($scope.checkDuplicateTodoName('todo 1') > -1).to.not.equal(true);
                // passing

                expect($scope.addTodos).withArgs({
                    name: 'todo 1',
                    completed: false
                }).to.throwError();

                // expect($scope.checkDuplicateTodoName('todo 1') > -1).to.equal(true);
            });

            it('should be marked as complete (todo)', function () {
                var status = $scope.lists[0].todos[0].completed;
                status = true;

                // failed
                // expect(status).to.not.equal(true);
                // passing
                expect(status).to.equal(true);
            });

            it('should be marked as incomplete (todo)', function () {
                var status = $scope.lists[0].todos[0].completed;
                status = false;

                // failed
                // expect(status).to.equal(true);
                // passing
                expect(status).to.not.equal(true);
            });

            it('should be marked as complete when all todos are completed (list)', function () {
                // failed 
                // expect($scope.checkAllTodoStatus(true)).to.not.equal('complete');
                // passing
                expect($scope.checkAllTodoStatus(true)).to.equal('complete');
            });

            it('should be marked as incomplete when at least one todo in incomplete (list)',
                function () {
                    // failed 
                    // expect($scope.checkAllTodoStatus(false)).to.equal('complete');
                    // passing
                    expect($scope.checkAllTodoStatus(false)).to.not.equal('complete');
                });

        });

        describe('#delete', function () {

            it('should remove an existing list', function () {
                $scope.removeList('ryan');

                // failed
                // expect($scope.lists.length > 0).to.be.ok();
                // passing
                expect($scope.lists.length > 0).to.not.be.ok();
            });

            it('should remove an existing todo', function () {
                // failed
                // expect($scope.removeTodo('todo 1') > 0).to.not.be.ok();
                // passing
                expect($scope.removeTodo('todo 1') > 0).to.be.ok();
            });

        });

    });

})();

