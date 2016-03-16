'use strict'

import test from 'tape'
import pm from '../index'

test('ProseMaker exists', function (t) {
  t.equal(typeof pm, 'object', 'ProseMaker is an object')
  t.equal(typeof pm.version, 'string', 'ProseMaker has a version string')
  t.end()
})

test('PM conditions: always and never', function (t) {
  const data = {}
  // quick tests: 'inputdoc|expected result|test comment'
  const tests = [
    '|',
    'text|text|plain text is included',
    '[[always]]||blank stays blank',
    '[[always]]text|text|always includes text',
    '[[never]]||never blank stays blank',
    '[[never]]text||never text stays blank'
  ]

  tests.forEach((tester) => {
    const [doc, result, comment] = tester.split('|')
    t.equal(pm.prose(doc, data), result, comment)
  })
  t.end()
})

test('PM conditions: unrecognised', function (t) {
  const data = {}
  // quick tests: 'inputdoc|expected result|test comment'
  const tests = [
    '[[unrecognised]]|[[unrecognised]]|unrecognised condition stays in',
    '[[  unrecognised ]]text|[[  unrecognised ]]text|unrecognised condition keeps whitespace',
    '[[unrecognised]]text|[[unrecognised]]text|unrecognised condition acts as true'
  ]

  tests.forEach((tester) => {
    const [doc, result, comment] = tester.split('|')
    t.equal(pm.prose(doc, data), result, comment)
  })
  t.end()
})
