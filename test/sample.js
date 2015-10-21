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
      
      describe('#create', function () {

        it('should have a list', function() {
          $scope.createList('foo');
          expect($scope.lists.length).to.equal(1);
          expect($scope.lists[0].name).to.equal('foo');
          expect($scope.lists[0].completed).to.equal(false);
        });

      });

      // describe('#update', function () {
      //   it('should mark a list as completed', function () {
      //     $scope.addTodo('foo');
      //     $scope.complete('foo');
      //     expect($scope.completedItems().length).toBe(1);
      //   }); 
      // });
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
