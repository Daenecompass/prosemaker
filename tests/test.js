
'use strict'

var pm = require('../index')()
var fs = require('fs')

var test_file = '' + __dirname.split('/').pop() + '/tester.pm'

fs.readFile(test_file, function (err, data) {
  if (!err) {
    pm.prose(data.toString())
  } else {
    console.log(err)
  }
})
