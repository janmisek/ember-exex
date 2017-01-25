import {test} from 'ember-qunit';
import {defineError, BaseError} from 'exex-js/error/error';
/* global module, ok, deepEqual, throws, equal */

module('error - inheritance ', {});

test('Error should be instanceof BaseError', function () {

  const TestError = defineError({
    name: 'TestError'
  });


  const BranchError1 = defineError({
    name: 'BranchError1',
    extends: TestError
  });

  const BranchError2 = defineError({
    name: 'BranchError1',
    extends: TestError
  });

  const error = new TestError();
  const berror1 = new BranchError1();

  ok(error instanceof BaseError);

  // proper extension branching
  ok(berror1 instanceof BaseError);
  ok(berror1 instanceof TestError);
  ok(berror1 instanceof BranchError1);
  ok(!(berror1 instanceof BranchError2));

  equal(error.constructor, TestError);
  equal(error.superclass, BaseError);

  equal(berror1.constructor, BranchError1);
  equal(berror1.superclass, TestError);

});

test('Error should have proper name', function () {
  let error;

  const NamedError = defineError({
    name: 'NamedError'
  });

  error = new NamedError();

  equal(NamedError.prototype.name, 'NamedError');
  equal(error.name, 'NamedError');

  const NonameError = defineError();

  error = new NonameError();

  equal(NonameError.prototype.name, 'CustomError');
  equal(error.name, 'CustomError');

});


