import {test, module} from 'ember-qunit';
import {defineError} from 'ember-exex/error';

module('error - parametrizations ', {});

test('Error constiables in string should be replaced by exception params', function (asserts) {

  const TestError = defineError({name: 'TestError', message: 'Test error name: {name}'});
  const error = new TestError({
    params: {
      name: 'ParametrizedName'
    }
  });

  asserts.ok(error.message.match(/ParametrizedName/i));

});

test('String is converted to object with message using defaultErrorConstructor', function (asserts) {

  const message = 'Hello world';
  const TestError = defineError({name: 'TestError', message: 'Test error'});

  const error1 = new TestError(message);
  const error2 = new TestError({message: message});

  asserts.equal(error1.message, message);
  asserts.equal(error2.message, message);
});

