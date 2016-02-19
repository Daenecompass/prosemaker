
'use strict'

let parser = require('../dist/pmparse')

function pmFactory () {
  return {
    prose: (inputDoc, data) => {
      // parse the doc into it's ast
      let ast = parser.parse(inputDoc)

      // walk the ast sections, evaluating conditions
      ast.sections.forEach((section) => {
        console.log(section.type, ' :: ', section.condition.content)
      })
    }

    // more things
  }
}

module.exports = pmFactory
