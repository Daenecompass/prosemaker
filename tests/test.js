
'use strict'

var parser = require('../dist/pm')
var fs = require('fs')

var test_file = '' + __dirname.split('/').pop() + '/tester.pm'

fs.readFile(test_file, function (err, data) {
  if (!err) {
    console.log('Parser output:')
    console.log(parser.parse(data.toString()))
  } else {
    console.log(err)
  }
})
