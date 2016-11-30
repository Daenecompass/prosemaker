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
test('PM replaceables: single replacement', function (t) {
  proseTest(t, {}, [
    '{{foobar}}|foobar|single replaceable works',
    '{{FooBar}}|FooBar|capitals preserved',
    '{{  foobar }}|foobar|whitespaces removed',
    '{{foobar3}}|foobar3|numbers accepted'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: variable replacement', function (t) {
  proseTest(t, {
    one: 1
  }, [
    '{{one}}|1|single replaceable variable works'
  ])
})
// ----------------------------------------------------------------------------
test.skip('PM replaceables: handling transform', function (t) {
  proseTest(t, {
    placeholder: 'Label'
  }, [
    '{{placeholder, transformName}}|Label|single replaceable variable and transform works'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: handling allCaps transform', function (t) {
  proseTest(t, {
    placeholder: 'foobar'
  }, [
    '{{placeholder, allCaps}}|FOOBAR|testing allCaps transform works'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: handling noCaps transform', function (t) {
  proseTest(t, {
    placeholder: 'FOOBAR'
  }, [
    '{{placeholder, noCaps}}|foobar|testing noCaps transform works'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: handling absolute transform', function (t) {
  proseTest(t, {
    placeholder: 'Foobar',
    ten: 10,
    negten: -10,
    tenstr: '10',
    negtenstr: '-10'
  }, [
    '{{placeholder, absolute}}|Foobar|testing absolute transform handles non-numeric values',
    '{{ten, absolute}}|10|testing absolute transform handles numeric values',
    '{{negten, absolute}}|10|testing absolute transform handles negative numeric values',
    '{{tenstr, absolute}}|10|testing absolute transform handles numeric values',
    '{{negtenstr, absolute}}|10|testing absolute transform handles negative numeric values'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: handling round transform', function (t) {
  proseTest(t, {
    fivepointthree: 5.3,
    fivepointfive: 5.5,
    fivepointsevenstr: '5.7'
  }, [
    '{{fivepointthree, round}}|5|testing round transform works',
    '{{fivepointfive, round}}|6|testing round transform works',
    '{{fivepointsevenstr, round}}|6|testing round transform works with string number input'// ,
//    '{{fivepointthree, round 0.1}}|5.4|testing round transform works',
//    '{{fivepointfive, round 0.1}}|5.6|testing round transform works',
//    '{{fivepointseven, round 0.1}}|5.8|testing round transform works'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: handling roundUp transform', function (t) {
  proseTest(t, {
    fivepointthree: 5.3,
    fivepointfive: 5.5,
    fivepointsevenstr: '5.7'
  }, [
    '{{fivepointthree, roundUp}}|6|testing roundUp transform works',
    '{{fivepointfive, roundUp}}|6|testing roundUp transform works',
    '{{fivepointsevenstr, roundUp}}|6|testing roundUp transform works with string number input'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: handling roundDown transform', function (t) {
  proseTest(t, {
    fivepointthree: 5.3,
    fivepointfive: 5.5,
    fivepointsevenstr: '5.7'
  }, [
    '{{fivepointthree, roundDown}}|5|testing roundDown transform works',
    '{{fivepointfive, roundDown}}|5|testing roundDown transform works',
    '{{fivepointsevenstr, roundDown}}|5|testing roundDown transform works with string number input'
  ])
})
// ----------------------------------------------------------------------------
