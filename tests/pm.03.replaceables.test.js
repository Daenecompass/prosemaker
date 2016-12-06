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
test('PM replaceables: handling add transform', function (t) {
  proseTest(t, {
    five: 5
  }, [
    '{{five, add 5}}|10|testing add transform works',
    '{{five, add 5 5}}|15|testing add transform works with multiple parameters'
    // '{{five, add 5 five}}|10|testing add transform handles non-numeric parameters'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: handling subtract transform', function (t) {
  proseTest(t, {
    ten: 10
  }, [
    '{{ten, subtract 5}}|5|testing subtract transform works',
    '{{ten, subtract 5 5}}|0|testing subtract transform works with multiple parameters',
    '{{ten, subtract 15}}|-5|testing subtract transform works when result is negative'
    // '{{ten, subtract 5 five}}|10|testing subtract transform handles non-numeric parameters'
  ])
})
// ----------------------------------------------------------------------------
test.skip('PM replaceables: handling unknown transform', function (t) {
  proseTest(t, {
    placeholder: 'text'
  }, [
    '{{placeholder, spin}}|placeholder, spin|testing parser returns unknown transforms as is',
    '{{placeholder, spin 5}}|placeholder, spin 5|testing parser returns unknown transforms as is with parameter'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: chaining transforms', function (t) {
  proseTest(t, {
    ten: 10,
    fivepointfour: 5.4,
    fivepointfive: 5.5
  }, [
    '{{ten, subtract 4.5, roundUp}}|6|testing chaining transforms works (subtract + roundUp)',
    '{{ten, add 6.7, roundDown}}|16|testing chaining transforms works (add + roundDown)',
    '{{fivepointfour, round, add 3.5}}|8.5|testing chaining transforms works (round + add)',
    '{{fivepointfive, round, add 3.5}}|9.5|testing chaining transforms works (round + add)',
    '{{fivepointfive, add 2.9, round}}|8|testing chaining transforms works (add + round)',
    '{{fivepointfive, add 3, round}}|9|testing chaining transforms works (add + round)'
  ])
})
// ----------------------------------------------------------------------------
