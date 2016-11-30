
'use strict'

var pm = require('../index')
var fs = require('fs')

var test_file = '' + __dirname.split('/').pop() + '/tester.pm'

fs.readFile(test_file, function (err, fileContent) {
  if (!err) {
    console.log(pm.prose(fileContent.toString(), { one: 1, two: 2, placeholder: 'placeholder', characters: 'characters',
    absPositiveNumber: '100', absNegativeNumber: '-200', rndfivepointthree: 5.3, rndfivepointfive: 5.5,
    rndfivepointseven: 5.7, rndfourpointfive: 4.5, rndword: 'word'}))
  } else {
    console.log(err)
  }
})
