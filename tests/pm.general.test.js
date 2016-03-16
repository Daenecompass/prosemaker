'use strict'

import test from 'tape'
import pm from '../index'
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
test('ProseMaker exists', function (t) {
  t.equal(typeof pm, 'object', 'ProseMaker is an object')
  t.equal(typeof pm.version, 'string', 'ProseMaker has a version string')
  t.end()
})
// ----------------------------------------------------------------------------
