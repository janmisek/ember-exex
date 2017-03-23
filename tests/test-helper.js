import resolver from './helpers/resolver';

import {
  setResolver
} from 'ember-qunit';

/* global QUnit */

// log errors to console
if ((typeof QUnit) !== "undefined" && typeof(console) !== "undefined") {
  QUnit.log(function (details) {
    if (!details.result) {

      if (details.message && details.message.indexOf("\n    at") > -1) {
        console.error(details.message); // eslint-disable-line no-console
      }

      if (details.message instanceof Error) {
        console.error(`Error in test: '${details.module}/${details.name}' `, details.message.message, details.message.stack); // eslint-disable-line no-console
      }

      else if (details.source) {
        console.error(`Error in test: '${details.module}/${details.name}' `, details.source); // eslint-disable-line no-console
      }


    }
  });
}

if (!Array.prototype.find) {
  Array.prototype.find = function (callback, thisArg) {
    "use strict";
    var arr = this, arrLen = arr.length, i;
    for (i = 0; i < arrLen; i += 1) {
      if (callback.call(thisArg, arr[i], i, arr)) {
        return arr[i];
      }
    }
    return undefined;
  };
}

setResolver(resolver);
