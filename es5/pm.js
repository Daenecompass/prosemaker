
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parser = require('../dist/pm-parse');

var PM = function () {
  function PM() {
    _classCallCheck(this, PM);

    this.data = {};
    this.ast = {};
  }
  // ------------------------------------------------------


  _createClass(PM, [{
    key: 'prose',
    value: function prose(inputDoc, data) {
      var _this = this;

      // save the data
      this.data = data;

      // parse the doc into an ast
      this.ast = parser.parse(inputDoc);

      // walk the ast sections, evaluating conditions
      this.ast.sections.forEach(function (section) {
        // section meta info
        console.log(['\n********* ' + section.type, ' :: ' + section.condition.raw, ' (' + _this.resolveCondition(section.condition) + ')'].join(''));

        // section content
        console.log(section.chunks.map(function (chunk) {
          if (chunk.type === 'replaceable') {
            return _this.resolveReplaceable(chunk, data);
          } else if (chunk.type === 'text') {
            return chunk.raw;
          }
        }).join(''));
      });
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
      var rawDown = condition.raw.toLowerCase();
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
    // ------------------------------------------------------

  }, {
    key: 'resolveReplaceable',
    value: function resolveReplaceable(replaceable, data) {
      // bail if this isn't a replaceable object
      if (replaceable.type !== 'replaceable') {
        return null;
      }
      // - - - - - - - - - - - - - - - - - - - - -
      // TODO: look for data etc

      // - - - - - - - - - - - - - - - - - - - - -
      // fall back on returning the raw content
      return '{{ ' + replaceable.raw + ' }}';
    }
  }]);

  return PM;
}();

module.exports = PM;