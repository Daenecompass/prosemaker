'use strict'

const test = require('tape')
const pm = require('../index')
// var fs = require('fs')

test('ProseMaker exists', function (t) {
  t.equal(typeof pm, 'object', 'ProseMaker is an object')
  t.equal(typeof pm.version, 'string', 'ProseMaker has a version string')
  t.end()
})

test('PM conditions: always and never v1', function (t) {
  const data = {}
  const tests = [
    '', '',
    'text', 'text',
    '[[always]]', '',
    '[[always]]text', 'text',
    '[[never]]', '',
    '[[never]]text', '',
  ]

  for (let d = 0; d < tests.length; d += 2) {
    t.equal(pm.prose(tests[d], data), tests[d+1])
  }
  t.end()
})

test('PM conditions: always and never v2', function (t) {
  const data = {}
  const tests = [
    '|',
    'text|text',
    '[[always]]|',
    '[[always]]text|text',
    '[[never]]|',
    '[[never]]text|',
  ]

  tests.forEach((tester) => {
    // should work..?
    const bits = tester.split('|')
    var [doc, result, comment] = bits

    console.log('d:', doc, 'r:', result, 'c:', comment)
    t.equal(pm.prose(doc, data), result, comment)
  })
  t.end()
})
