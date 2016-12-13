'use strict';

var lookupComparator = {
  '==': function _(left, right) {
    return left === right;
  },
  '!=': function _(left, right) {
    return left !== right;
  },
  '<': function _(left, right) {
    return left < right;
  },
  '<=': function _(left, right) {
    return left <= right;
  },
  '>': function _(left, right) {
    return left > right;
  },
  '>=': function _(left, right) {
    return left >= right;
  }
};

module.exports = lookupComparator;