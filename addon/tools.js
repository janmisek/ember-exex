export var replaceParams = function (string, params) {
  return string.replace(/{([^}]*)}/g, function (match, key) {
    return params[key];
  });
};

export var merge = function (o, defaults) {
  if (o && defaults && typeof defaults === 'object') {
    if (!o) {
      o = {};
    }

    for (var p in defaults) {
      if (defaults.hasOwnProperty(p)) {
        if (typeof o[p] === 'undefined') {
          o[p] = defaults[p];
        }
      }
    }
  }
  return o;
};

export var renameFunction = function (name, fn) {
  return (new Function("return function (call) { return function " + name +
    " () { return call(this, arguments) }; };")())(Function.apply.bind(fn));
};

export var renameClass = function (Klazz, name) {
  let Renamed = renameFunction(name, Klazz);

  Renamed.prototype = Object.create(Klazz.prototype);
  Renamed.prototype.constructor = Renamed;
  Renamed.prototype.superclass = Klazz.prototype.superclass;

  return Renamed;
};

