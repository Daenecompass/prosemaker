
'use strict'

var pm = require('../index')
var fs = require('fs')

var test_file = '' + __dirname.split('/').pop() + '/tester.pm'

fs.readFile(test_file, function (err, data) {
  console.log('read the file.')
  if (!err) {
    console.log(pm.prose(data.toString()))
  } else {
    console.log(err)
  }
})
