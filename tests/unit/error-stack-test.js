import {module, test} from 'ember-qunit';
import {defineError} from 'ember-exex/error';

module('error - stack ', {});

test('Error stack should have error code extracted from stack', function (asserts) {


  const TestError = defineError({name: 'TestError'});
  const error = new TestError();

  const stack = error.stack;

  const found = stack
    .split('\n')
    .find((r, i) => (r.indexOf('ErrorConstructor') !== -1 && i > 0));

  asserts.ok(!found);

});

test('Error stack should have previous error included', function (asserts) {

  const TopError = defineError({name: 'TopError', message: 'I am on top'});
  const PreviousError = defineError({name: 'PreviousError', message: 'I am on bottom'});

  const error = new TopError().withPreviousError(new PreviousError());

  const stack = error.stack;

  let found;

  found = stack
    .split('\n')
    .find(r => r === 'TopError: I am on top');

  asserts.ok(found);

  found = stack
    .split('\n')
    .find(r => r === 'Previous: PreviousError: I am on bottom');

  asserts.ok(found);

});

test('Error stack of previous error is formatted properly', function (asserts) {

  const TopError = defineError({name: 'TopError', message: 'I am on top'});
  const objectAsError = {
    stack: "Error \n    This is my stack line",
    message: 'This is my message',
    name: 'Error'
  };

  const error = new TopError().withPreviousError(objectAsError);

  const stack = error.stack;

  let found;

  found = stack
    .split('\n')
    .find(r => r.trim() === 'Previous: Error: This is my message');

  asserts.ok(found);

  found = stack
    .split('\n')
    .find(r => r.trim() === 'This is my stack line');

  asserts.ok(found);

});
