
'use strict'

let parser = require('../dist/pm-parse')
let replaceableResolver = require('./resolvers/replaceable')

class PM {
  constructor () {
    this.data = {}
    this.ast = {}
    this.version = 'beta'
  }
  // ------------------------------------------------------
  prose (inputDoc, data) {
    let result = []

    // save the data
    this.data = data

    // parse the doc into an ast
    this.ast = parser.parse(inputDoc)

    // walk the ast sections, evaluating conditions
    this.ast.sections.forEach((section) => {
      // process each section, by checking the condition,
      // and if the condition checks out, resolving chunks
      // and appending the resolved content onto the result
      // array.
      if (this.resolveCondition(section.condition, data)) {
        // condition is true; now collect chunks
        section.chunks.forEach((chunk) => {
          if (chunk.type === 'replaceable') {
            result.push(replaceableResolver(chunk, data))
          } else if (chunk.type === 'text') {
            result.push(chunk.raw)
          }
        })
      }
    })

    return result.join('')
  }
  // ------------------------------------------------------
  resolveCondition (condition, data) {
    // bail if this isn't a condition object
    if (condition.type !== 'condition') {
      return null
    }
    // for convenience, downcase the raw text
    const rawDown = condition.raw.toLowerCase().trim()
    // - - - - - - - - - - - - - - - - - - - - -
    // handle the straight booleans
    if (rawDown === 'always') {
      return true
    }
    if (rawDown === 'never') {
      return false
    }
    // - - - - - - - - - - - - - - - - - - - - -
    // if all else fails, return null
    return null
  }
}

module.exports = PM
