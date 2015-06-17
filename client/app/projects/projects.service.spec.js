'use strict';

describe('Service: projects', function () {

  // load the service's module
  beforeEach(module('researchApp'));

  // instantiate service
  var projects;
  beforeEach(inject(function (_projects_) {
    projects = _projects_;
  }));

  it('should do something', function () {
    expect(!!projects).toBe(true);
  });

});
