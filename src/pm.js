
'use strict'

let parser = require('../dist/pm-parse')

class PM {
  constructor () {
    this.data = {}
    this.ast = {}
  }
  // ------------------------------------------------------
  prose (inputDoc, data) {
    // save the data
    this.data = data

    // parse the doc into an ast
    this.ast = parser.parse(inputDoc)

    // walk the ast sections, evaluating conditions
    this.ast.sections.forEach((section) => {
      // section meta info
      console.log([
        '\n********* ' + section.type,
        ' :: ' + section.condition.raw,
        ' (' + this.resolveCondition(section.condition) + ')'
      ].join(''))

      // section content
      console.log(
        section.chunks.map((chunk) => {
          if (chunk.type === 'replaceable') {
            return this.resolveReplaceable(chunk, data)
          } else if (chunk.type === 'text') {
            return chunk.raw
          }
        }).join('')
      )
    })
  }
  // ------------------------------------------------------
  resolveCondition (condition, data) {
    // bail if this isn't a condition object
    if (condition.type !== 'condition') {
      return null
    }
    // for convenience, downcase the raw text
    const rawDown = condition.raw.toLowerCase()
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
  // ------------------------------------------------------
  resolveReplaceable (replaceable, data) {
    // bail if this isn't a replaceable object
    if (replaceable.type !== 'replaceable') {
      return null
    }
    // - - - - - - - - - - - - - - - - - - - - -
    // TODO: look for data etc

    // - - - - - - - - - - - - - - - - - - - - -
    // fall back on returning the raw content
    return '{{ ' + replaceable.raw + ' }}'
  }
}

module.exports = PM
