
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parser = require('../dist/pm-parse');

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
      return parser.parse(inputDoc, { data: data });
    }
    // ------------------------------------------------------

  }, {
    key: 'resolveCondition',
    value: function resolveCondition(condition, data) {
      // bail if this isn't a condition object
      if (condition.type !== 'condition') {
        return null;
      }
      // - - - - - - - - - - - - - - - - - - - - -
      // handle the straight booleans
      if (condition.content.type === 'always') {
        return true;
      }
      if (condition.content.type === 'never') {
        return false;
      }
      // - - - - - - - - - - - - - - - - - - - - -
      // handle an unrecognised condition
      if (condition.content.type === 'unrecognised') {
        return '[[' + condition.content.content + ']]';
      }
      // - - - - - - - - - - - - - - - - - - - - -
      // if all else fails, return null
      return null;
    }
  }]);

  return PM;
}();

module.exports = PM;