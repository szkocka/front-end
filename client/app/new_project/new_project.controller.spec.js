'use strict';

describe('Controller: NewProjectCtrl', function () {

  // load the controller's module
  beforeEach(module('researchApp'));

  var NewProjectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewProjectCtrl = $controller('NewProjectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
