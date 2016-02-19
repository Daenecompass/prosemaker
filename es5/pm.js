
'use strict';

var parser = require('../dist/pmparse');

function pmFactory() {
  return {
    prose: function prose(inputDoc, data) {
      // parse the doc into it's ast
      var ast = parser.parse(inputDoc);

      // walk the ast sections, evaluating conditions
      ast.sections.forEach(function (section) {
        console.log(section.type, ' :: ', section.condition.content);
      });
    }

    // more things
  };
}

module.exports = pmFactory;