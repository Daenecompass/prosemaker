
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parser = require('../dist/pm-parse');
var replaceableResolver = require('./resolvers/replaceable');

var PM = function () {
  function PM() {
    _classCallCheck(this, PM);

    this.data = {};
    this.ast = {};
    this.version = 'beta';
  }
  // ------------------------------------------------------


  _createClass(PM, [{
    key: 'prose',
    value: function prose(inputDoc, data) {
      var _this = this;

      var result = [];

      // save the data
      this.data = data;

      // parse the doc into an ast
      this.ast = parser.parse(inputDoc);

      // walk the ast sections, evaluating conditions
      this.ast.sections.forEach(function (section) {
        // process each section, by checking the condition,
        // and if the condition checks out, resolving chunks
        // and appending the resolved content onto the result
        // array.
        if (_this.resolveCondition(section.condition, data)) {
          // condition is true; now collect chunks
          section.chunks.forEach(function (chunk) {
            if (chunk.type === 'replaceable') {
              result.push(replaceableResolver(chunk, data));
            } else if (chunk.type === 'text') {
              result.push(chunk.raw);
            }
          });
        }
      });

      return result.join('');
    }
    // ------------------------------------------------------

  }, {
    key: 'resolveCondition',
    value: function resolveCondition(condition, data) {
      // bail if this isn't a condition object
      if (condition.type !== 'condition') {
        return null;
      }
      // for convenience, downcase the raw text
      var rawDown = condition.raw.toLowerCase().trim();
      // - - - - - - - - - - - - - - - - - - - - -
      // handle the straight booleans
      if (rawDown === 'always') {
        return true;
      }
      if (rawDown === 'never') {
        return false;
      }
      // - - - - - - - - - - - - - - - - - - - - -
      // if all else fails, return null
      return null;
    }
  }]);

  return PM;
}();

module.exports = PM;