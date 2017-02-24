import {test} from 'ember-qunit';
import {defineError, BaseError} from 'ember-exex/error';
/* global module, ok, deepEqual, throws, equal */

module('error - stack ', {});

test('Error stack should have error code extracted from stack', function () {


  const TestError = defineError({name: 'TestError'});
  const error = new TestError();

  const stack = error.stack;

  const found = stack
    .split('\n')
    .find((r,i) => (r.indexOf('ErrorConstructor') !== -1 && i > 0));

  ok(!found);

});

test('Error stack should have previous error included', function () {

  const TopError = defineError({name: 'TopError', message: 'I am on top'});
  const PreviousError = defineError({name: 'PreviousError', message: 'I am on bottom'});

  const error = new TopError().withPreviousError(new PreviousError());

  const stack = error.stack;

  let found;

  found = stack
    .split('\n')
    .find(r => r === 'TopError: I am on top');

  ok(found);

  found = stack
    .split('\n')
    .find(r => r === 'Previous: PreviousError: I am on bottom');

  ok(found);

});
