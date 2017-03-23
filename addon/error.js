import {merge, renameClass, replaceParams} from './tools';
import {createStackProperty} from './stack';

//***********************************
// Errors implementation
//***********************************


export function BaseError(message = "Base error") {
  this.name = "BaseError";
  this.message = message;
  this.stack = new Error().stack;
}
BaseError.prototype = Object.create(Error.prototype);
BaseError.prototype.constructor = BaseError;
BaseError.prototype.superclass = Error;

//***********************************
// Errors define function
//***********************************


export var defineError = function (definition) {


  // default values
  definition = definition || {};
  definition.name = definition.name || 'CustomError';
  definition.message = definition.message || name;
  definition.code = definition.code || 0;
  definition.extends = definition.extends || BaseError;

  if (!(definition.extends.prototype instanceof Error)) {
    throw new Error('Only Error could be extended');
  }


  // define error constructor
  var ErrorConstructor = function (options = {}) {

    // check whether called as constructor
    if (!ErrorConstructor.prototype.isPrototypeOf(this)) {
      throw new Error(`${definition.name}() must be called as constructor e.g 'new ${definition.name}()'`);
    }

    // check whether there is message or object in params, optionally convert message to options object
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }

    // clone options first, to be able to modify options object later
    options = merge({}, options);

    // set error values
    this.message = options.message || this.message;
    this.message = options.params ? replaceParams(this.message, options.params) : this.message;
    this.code = options.code || this.code;
    this.withPreviousError(options.previous);

    // create stack property
    createStackProperty(this, definition.stackRemoval);
  };

  // define error prototype
  ErrorConstructor.prototype = Object.create(definition.extends.prototype);
  ErrorConstructor.prototype.superclass = definition.extends;

  ErrorConstructor.prototype.withDescription = function (description) {
    this.description = description;
    return this;
  };

  ErrorConstructor.prototype.withPreviousError = function (e) {
    if (e) {
      this.previous = e;
    }
    return this;
  };

  ErrorConstructor.prototype.withAdditionalData = function (additionalData) {
    if (!this.additionalData) {
      this.additionalData = [];
    }
    this.additionalData.push(additionalData);

    return this;
  };

  // generic prototype extension
  delete definition['extends'];
  delete definition['constructor'];

  for (let k in definition) {
    if (definition.hasOwnProperty(k)) {
      ErrorConstructor.prototype[k] = definition[k];
    }
  }

  return renameClass(ErrorConstructor, definition.name);
};

