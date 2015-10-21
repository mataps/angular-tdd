/*global describe, it, beforeEach, inject, expect*/

(function() {

    'use strict';

    var $controller, $scope;

		beforeEach(module('myapp'));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
		$scope = _$rootScope_.$new();
        $controller = _$controller_('listController', {$scope: $scope});
    }));

    describe('List', function () {

        beforeEach('create a list', function () {
            $scope.createList('ryan');
            expect($scope.lists.length).to.equal(1);
            expect($scope.lists[0].name).to.equal('ryan');
            expect($scope.lists[0].completed).to.equal(false);
        });
      
      // describe('#create', function () {
      //   it('should have a list', function() {
      //     expect($scope.lists.length).to.equal(1);
      //     expect($scope.lists[0].name).to.equal('foo');
      //     expect($scope.lists[0].completed).to.equal(false);
      //   });
      // });

      describe('#update', function () {
        it('should be marked as completed', function () {
            // check if updated completed status (state) if from ryan
            $scope.markAsCompleted('ryan');
            expect($scope.lists[0].completed).to.equal(true);
        }); 

        it('should throw an error when name is missing', function () {
            expect($scope.markAsCompleted).withArgs('').to.throwError(function (error) {
                expect(error.message).to.be($scope.errMessages['no_name']);
            });
        });

        // it('should throw an error when address is missing')
      });
      //
      // describe('#remove, function () {
      //   it('should remove an exisiting todo', function() {
      //     $scope.addTodo('foo');
      //     $scope.removeTodo('foo');
      //     expect($scope.todos.length).toBe(0);
      //   });
      // });

    });

})();
