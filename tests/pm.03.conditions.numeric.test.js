'use strict'

import test from 'tape'
import pm from '../index'

import utils from './testutils'

let proseTest = utils.proseTest
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
test('PM conditions: literal numbers', function (t) {
  proseTest(pm, t, {}, [
    '[[1    == 1  ]]included|included|int-int equality',
    '[[1.0  == 1  ]]included|included|float-int equality',
    '[[1.2  == 1.2]]included|included|float-float equality',
    '[[1.20 == 1.2]]included|included|float-float equality',
    '[[3    == 3  ]]included|included|int-int equality',
    '[[  3==3]]included|included|int-int spaced equality',
    '[[1 == 3]]|excluded||int-int not equality'
  ])
})
// ----------------------------------------------------------------------------
