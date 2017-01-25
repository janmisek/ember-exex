export var StackTraceParser = {
  parse: function (error, stack) {
    stack = stack.split("\n");
    stack.shift();

    stack = stack.map(function (source) {
      source = source.replace(/\r?\n|\r/g, " ");
      return {
        source: source
      };
    });

    return stack;
  }
};


export var StackTraceRenderer = {

  renderPrevious: function (error) {
    if (error) {
      let stack;
      if (error.stack) {
        stack = error.stack;
      } else if (error.name || error.message) {
        stack = (error.name || 'Error') + (error.message ? ': ' + error.message : '');
      } else {
        stack = error.toString();
      }
      return "\n\nPrevious: " + stack;
    } else {
      return '';
    }
  },

  render: function (error, frames, stackRemoval) {
    frames = frames.slice();

    // slice first frames, depends on stack removal
    if (stackRemoval && typeof frames.shift === 'function') {
      for (var i = 0; i < stackRemoval; i++) {
        frames.shift();
      }
    }

    let stack = [];

    stack.push((error.name || 'Error') + (error.message ? ': ' + error.message : ''));
    stack = stack.concat(typeof frames.map === 'function' ? frames.map(f => f.source) : ['  at ?']);
    stack = stack.join("\n");

    stack = stack + this.renderPrevious(error.previous);

    return stack;
  }

};

export var initializeStack = function(error) {
  let stack = new Error(error.message).stack;
  if (!stack) {
    try {
      throw new Error(error.message);
    } catch (e) {
      stack = e.stack;
    }
  }
  return stack;
};


export var createStackProperty = function (error, stackRemoval) {

  stackRemoval = (typeof stackRemoval === 'undefined') ? 4 : stackRemoval;
  var parsed, stack = initializeStack(error);

  var parse = function () {
    if (!parsed) {
      try {
        parsed = StackTraceParser.parse(error, stack);
      } catch (e) {
        console.error(e.stack);
        // pass
      }
    }
    return parsed;
  };

  var render = function () {
    parse();

    if (!parsed) {
      return stack;
    }

    return StackTraceRenderer.render(error, parsed, stackRemoval);
  };

  Object.defineProperty(error, "frames", {
    get: function () {
      return parse();
    },
    set: function () {
      // pass
    }
  });

  Object.defineProperty(error, "stack", {
    get: function () {
      return render();
    },
    set: function (astack) {
      parsed = null;
      stack = astack;
    }
  });
};
