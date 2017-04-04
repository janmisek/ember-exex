import {module, test} from 'ember-qunit';
import {defineError, BaseError} from 'ember-exex/error';

module('error - inheritance ', {});

test('Error should be instanceof BaseError', function (asserts) {

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

  asserts.ok(error instanceof BaseError);

  // proper extension branching
  asserts.ok(berror1 instanceof BaseError);
  asserts.ok(berror1 instanceof TestError);
  asserts.ok(berror1 instanceof BranchError1);
  asserts.ok(!(berror1 instanceof BranchError2));

  asserts.equal(error.constructor, TestError);
  asserts.equal(error.superclass, BaseError);

  asserts.equal(berror1.constructor, BranchError1);
  asserts.equal(berror1.superclass, TestError);

});

test('Error should have proper name and attributes', function (asserts) {
  let error;

  const NamedError = defineError({
    name: 'NamedError'
  });

  error = new NamedError();

  asserts.equal(NamedError.prototype.name, 'NamedError');
  asserts.equal(error.name, 'NamedError');
  asserts.equal(error.exex, true);

  const NonameError = defineError();

  error = new NonameError();

  asserts.equal(NonameError.prototype.name, 'CustomError');
  asserts.equal(error.name, 'CustomError');
  asserts.equal(error.exex, true);

});


