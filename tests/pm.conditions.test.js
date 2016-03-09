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
    'text|text|plain text is included',
  ]);
})
// ----------------------------------------------------------------------------
test.skip('PM conditions: always', function (t) {
  proseTest(t, {}, [
    '[[always]]||always blank stays blank',
    '[[always]]text|text|always includes text',
    '[[ always]]text|text|always space padding',
    '[[always ]]text|text|always space padding',
    '[[   always  ]]text|text|always space padding',
    '[[AlWaYs]]text|text|always capitalisation',
  ]);
})
// ----------------------------------------------------------------------------
test.skip('PM conditions: never', function (t) {
  proseTest(t, {}, [
    '[[never]]||never blank stays blank',
    '[[never]]text||never text stays blank',
    '[[ never]]text|text|never space padding',
    '[[never ]]text|text|never space padding',
    '[[   never  ]]text|text|never space padding',
    '[[NeVeR]]text|text|never capitalisation',
  ]);
})
// ----------------------------------------------------------------------------
test.skip('PM conditions: always and never', function (t) {
  proseTest(t, {}, [
    'showing[[never]]hiding|showing|default always > never',
    '[[never]]hiding[[always]]showing[[never]]hiding|showing|never > always > never',
    '[[never]][[always]]showing|showing|never blank > always',
    '[[never]]hiding[[always]]||never > always blank',
    '[[always]][[never]]hiding||always blank > never',
  ]);
})
// ----------------------------------------------------------------------------
