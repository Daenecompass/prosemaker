// utilities for testing

// ----------------------------------------------------------------------------
// convenience function that takes an array of strings, splits each one
// on pipes tp extract "input|expected-result|optional-test-message", and
// optionally data to use when prose-ing.
function proseTest (pm, t, data = {}, testList = []) {
  testList.forEach((tester) => {
    const [doc, result, comment] = tester.split('|')
    t.equal(pm.prose(doc, data), result, comment)
  })
  t.end()
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
module.exports = {
  proseTest
}

