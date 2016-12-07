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
test('PM replaceables: allCaps transforms', function (t) {
  proseTest(t, {
    placeholder: 'foobar',
    placeholder2: 'foobar2'
  }, [
    '{{placeholder, allCaps}}|FOOBAR|testing allCaps transform works',
    '{{placeholder2, allCaps}}|FOOBAR2|testing allCaps transform works with numbers'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: noCaps transforms', function (t) {
  proseTest(t, {
    placeholder: 'FOOBAR'
  }, [
    '{{placeholder, noCaps}}|foobar|testing noCaps transform works'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: absolute transforms', function (t) {
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
test('PM replaceables: round transforms', function (t) {
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
test('PM replaceables: roundUp transforms', function (t) {
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
test('PM replaceables: roundDown transforms', function (t) {
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
test('PM replaceables: add transforms', function (t) {
  proseTest(t, {
    five: 5
  }, [
    '{{five, add}}|5|testing add transform works with no parameters',
    '{{five, add c}}|5|testing add transform handles character parameters',
    '{{five, add c 3}}|8|testing add transform handles character and number parameters',
    '{{five, add 5}}|10|testing add transform works',
    '{{five, add 5 5}}|15|testing add transform works with multiple parameters'
    // '{{five, add 5 five}}|10|testing add transform handles non-numeric parameters'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: subtract transforms', function (t) {
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
    fivepointfive: 5.5,
    one: 1
  }, [
    '{{ten, subtract 4.5, roundUp}}|6|testing chaining transforms works (subtract + roundUp)',
    '{{ten, add 6.7, roundDown}}|16|testing chaining transforms works (add + roundDown)',
    '{{fivepointfour, round, add 3.5}}|8.5|testing chaining transforms works (round + add)',
    '{{fivepointfive, round, add 3.5}}|9.5|testing chaining transforms works (round + add)',
    '{{fivepointfive, add 2.9, round}}|8|testing chaining transforms works (add + round)',
    '{{fivepointfive, add 3, round}}|9|testing chaining transforms works (add + round)',
    '{{fivepointfive, round, plural apple apples}}|6 apples|testing chaining transforms works (round + plural)',
    '{{fivepointfive, add 4.7, round, plural apple apples}}|10 apples|testing chaining transforms works (add + round + plural)',
    '{{fivepointfive, plural apple apples, round}}|5.5 apples|testing chaining transforms works as expected (plural + round)',
    '{{one, plural apple apples, add 25.5}}|1 apple|testing chaining transforms works as expected (plural + add)'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: plural transforms', function (t) {
  proseTest(t, {
    apple_count: 1,
    pear_count: 2,
    pineapple_count: 0.5,
    banana_count: 1,
    oxen_count: 10,
    octopi_count: 3
  }, [
    '{{apple_count, plural}}|1 (item)|testing plural transform singular works with no parameters (Apple)',
    '{{pear_count, plural}}|2 (items)|testing plural transform non-singular works with no parameters (Pear)',
    '{{pineapple_count, plural}}|0.5 (items)|testing plural transform works with no parameters (Pineapple)',
    '{{pear_count, plural pear}}|2 pears|testing plural transform works with no supplied plural (Pear)',
    '{{banana_count, plural banana bananas}}|1 banana|testing plural transform works (Banana)',
    '{{oxen_count, plural ox oxen}}|10 oxen|testing plural transform works (Oxen)',
    '{{octopi_count, plural octopus}}|3 octopuss|testing plural transform works as expected with no plural supplied on a non-s plural (Octopi)',
    '{{octopi_count, plural octopus octopi}}|3 octopi|testing plural transform works (Octopi)'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: change transforms', function (t) {
  proseTest(t, {
    tempUp: 5,
    tempDown: -5,
    tempSame: 0
  }, [
    '{{tempUp, change}}|increase|testing change transform given no parameters works (increase)',
    '{{tempDown, change}}|decrease|testing change transform given no parameters works (decrease)',
    '{{tempSame, change}}|change|testing change transform given no parameters works (no change)',
    '{{tempUp, change rises}}|rises|testing change transform given parameter works (increase)',
    '{{tempDown, change rises}}|decrease|testing change transform missing parameter works (decrease)',
    '{{tempDown, change rises falls}}|falls|testing change transform given parameter works (decrease)',
    '{{tempSame, change rises falls}}|change|testing change transform missing parameter works (no change)',
    '{{tempSame, change rises falls remains}}|remains|testing change given parameter transform works (no change)'
  ])
})
// ----------------------------------------------------------------------------
test('PM replaceables: ordinal transforms', function (t) {
  proseTest(t, {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    twentyone: 21,
    twentytwo: 22,
    hundredandone: 101,
    hundredandeleven: 111,
    hundredandtwentytwo: 122,
    onepointone: 1.1
  }, [
    '{{one, ordinal}}|1st|testing ordinal transform works (1)',
    '{{two, ordinal}}|2nd|testing ordinal transform works (2)',
    '{{three, ordinal}}|3rd|testing ordinal transform works (3)',
    '{{four, ordinal}}|4th|testing ordinal transform works (4)',
    '{{eleven, ordinal}}|11th|testing ordinal transform works (11)',
    '{{twelve, ordinal}}|12th|testing ordinal transform works (12)',
    '{{thirteen, ordinal}}|13th|testing ordinal transform works (13)',
    '{{twentyone, ordinal}}|21st|testing ordinal transform works (21)',
    '{{twentytwo, ordinal}}|22nd|testing ordinal transform works (22)',
    '{{hundredandone, ordinal}}|101st|testing ordinal transform works (101)',
    '{{hundredandeleven, ordinal}}|111th|testing ordinal transform works (111)',
    '{{hundredandtwentytwo, ordinal}}|122nd|testing ordinal transform works (122)',
    '{{onepointone, ordinal}}|1.1th|testing ordinal transform handles decimals (1.1)'
  ])
})
// ----------------------------------------------------------------------------
