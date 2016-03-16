
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
      let conditionResolution = this.resolveCondition(section.condition, data)

      // if the condition resolution returns a string, it's
      // un-handled, so just include the string
      if (typeof conditionResolution === 'string') {
        result.push(conditionResolution)
      }

      // if the condition is a string OR if it's true, include the
      // chunks of this section
      if (conditionResolution) {
        // condition is true; now collect chunks
        section.chunks.forEach((chunk) => {
          if (chunk.type === 'replaceable') {
            result.push(replaceableResolver(chunk, data))
          } else if (chunk.type === 'text') {
            result.push(chunk.raw)
          }
        })
      } else {
        // the conditionResolution was false, so don't add anything
        // to the result string.
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
