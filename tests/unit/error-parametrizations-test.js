import {test} from 'ember-qunit';
import {defineError} from 'ember-exex/error';
/* global module, ok, deepEqual, throws, equal */

module('error - parametrizations ', {});

test('Error constiables in string should be replaced by exception params', function () {

  const TestError = defineError({name: 'TestError', message: 'Test error name: {name}'});
  const error = new TestError({
    params: {
      name: 'ParametrizedName'
    }
  });

  ok(error.message.match(/ParametrizedName/i));

});

test('String is converted to object with message using defaultErrorConstructor', function () {

  const message = 'Hello world';
  const TestError = defineError({name: 'TestError', message: 'Test error'});

  const error1 = new TestError(message);
  const error2 = new TestError({message: message});

  equal(error1.message, message);
  equal(error2.message, message);
});

