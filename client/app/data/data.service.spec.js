'use strict';

describe('Service: data', function () {

  // load the service's module
  beforeEach(module('researchApp'));

  // instantiate service
  var data;
  beforeEach(inject(function (_data_) {
    data = _data_;
  }));

  it('should do something', function () {
    expect(!!data).toBe(true);
  });

});
