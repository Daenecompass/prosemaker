'use strict'

import test from 'tape'
import pm from '../index'
// ----------------------------------------------------------------------------
// convenience function that takes an array of strings, splits each one
// on pipes tp extract "input|expected-result|optional-test-message", and
// optionally data to use when prose-ing.
function proseTest (t, data = {}, testList = []) {
  testList.forEach((tester) => {
    const [doc, result, comment] = tester.split('|')
    t.equal(pm.prose(doc, data), result, comment)
  })
  t.end()
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
test('PM conditions: plain text', function (t) {
  proseTest(t, {}, [
    '||blank stays blank',
    'text|text|plain text is included'
  ])
})
// ----------------------------------------------------------------------------
test('PM conditions: always', function (t) {
  proseTest(t, {}, [
    '[[always]]||always blank stays blank',
    '[[always]]text|text|always includes text',
    '[[ always]]text|text|always space left padding',
    '[[always ]]text|text|always space right padding',
    '[[   always  ]]text|text|always space both sides padding',
    '[[AlWaYs]]text|text|always capitalisation'
  ])
})
// ----------------------------------------------------------------------------
test('PM conditions: never', function (t) {
  proseTest(t, {}, [
    '[[never]]||never blank stays blank',
    '[[never]]text||never text stays blank',
    '[[ never]]text||never space left padding',
    '[[never ]]text||never space right padding',
    '[[   never  ]]text||never space both sides padding',
    '[[NeVeR]]text||never capitalisation'
  ])
})
// ----------------------------------------------------------------------------
test('PM conditions: always and never', function (t) {
  proseTest(t, {}, [
    'showing[[never]]hiding|showing|default always > never',
    '[[never]]hiding[[always]]showing[[never]]hiding|showing|never > always > never',
    '[[never]][[always]]showing|showing|never blank > always',
    '[[never]]hiding[[always]]||never > always blank',
    '[[always]][[never]]hiding||always blank > never'
  ])
})
// ----------------------------------------------------------------------------
test.skip('PM conditions: unrecognised', function (t) {
  proseTest(t, {}, [
    '[[unrecognised]]|[[unrecognised]]|unrecognised condition stays in',
    '[[  unrecognised ]]text|[[  unrecognised ]]text|unrecognised condition keeps whitespace',
    '[[unrecognised]]text|[[unrecognised]]text|unrecognised condition acts as true',
    '[[dt s sadf sdc  ]]text|[[dt s sadf sdc  ]]text|unrecognised condition is preserved',
    '[[1. Dt S sadf sdc  ]]text|[[1. Dt S sadf sdc  ]]text|unrecognised condition keeps caps etc'
  ])
})
// ----------------------------------------------------------------------------
test('PM conditions: numeric comparator conditions', function (t) {
  proseTest(t, {}, [
    '[[1 == 1]]True|True| testing that 1 == 1 is true',
    '[[1 == 2]]False||testing that 1 == 2 is false',
    '[[1 != 2]]True|True|testing that 1 != 2 is true',
    '[[1 != 1]]False||testing that 1 != 1 is false',
    '[[1 < 2]]True|True|testing that 1 < 2 is true',
    '[[2 < 1]]False||testing that 2 < 1 is false',
    '[[1 < 1]]False||testing that 1 < 1 is false',
    '[[1 <= 2]]True|True|testing that 1 <= 2 is true',
    '[[2 <= 1]]False||testing that 2 <= 1 is false',
    '[[1 <= 1]]True|True|testing that 1 <= 1 is true',
    '[[2 > 1]]True|True| testing that 2 > 1 is true',
    '[[1 > 2]]False|| testing that 1 > 2 is false',
    '[[1 > 1]]False|| testing that 2 > 2 is false',
    '[[2 >= 1]]True|True|testing that 2 >= 1 is true',
    '[[1 >= 2]]False||testing that 1 >= 2 is false',
    '[[1 >= 1]]True|True|testing that 1 >= 1 is true',
    '[[1 >=! 1]]Unrecognised|[[1 >=! 1]]Unrecognised|testing that unrecognised comparators are returned as is'
  ])
})
// ----------------------------------------------------------------------------
test('PM conditions: character comparator conditions', function (t) {
  proseTest(t, {}, [
    '[[abc == abc]]True|True|testing that abc == abc is true',
    '[[abc != abc]]False||testing that abc != abc is false'
  ])
})
// ----------------------------------------------------------------------------
test('PM conditions: variable comparator conditions', function (t) {
  proseTest(t, {
    abc: 1,
    string: 'AString',
    one: 1,
    oneString: '1'
  }, [
    // '[[abc == 1]]True|True|testing that abc == 1 is true',
    '[[abc != abc]]False||testing that abc != abc is false',
    '[[string == AString]]True|True|string == string',
    '[[one == oneString]]True|True|int == str(int)'
  ])
})
// ----------------------------------------------------------------------------
