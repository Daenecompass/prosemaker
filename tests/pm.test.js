
var test = require('tape')

var pm = require('../index')
// var fs = require('fs')

test('ProseMaker exists', function (t) {
  t.equal(typeof pm, 'object', 'ProseMaker is an object')
  t.equal(typeof pm.version, 'string', 'ProseMaker has a version string')
  t.end()
})
