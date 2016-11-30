
'use strict'

let parser = require('../dist/pm-parse')

class PM {
  constructor () {
    this.data = {}
    this.ast = {}
    this.version = 'beta'
  }
  // ------------------------------------------------------
  prose (inputDoc, data) {
    return parser.parse(inputDoc, { data: data })
  }
  // ------------------------------------------------------
  resolveCondition (condition, data) {
    // bail if this isn't a condition object
    if (condition.type !== 'condition') {
      return null
    }
    // - - - - - - - - - - - - - - - - - - - - -
    // handle the straight booleans
    if (condition.content.type === 'always') {
      return true
    }
    if (condition.content.type === 'never') {
      return false
    }
    // - - - - - - - - - - - - - - - - - - - - -
    // handle an unrecognised condition
    if (condition.content.type === 'unrecognised') {
      return '[[' + condition.content.content + ']]'
    }
    // - - - - - - - - - - - - - - - - - - - - -
    // if all else fails, return null
    return null
  }
}

module.exports = PM
