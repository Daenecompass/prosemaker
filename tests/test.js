
'use strict'

var pm = require('../index')
var fs = require('fs')

var test_file = '' + __dirname.split('/').pop() + '/tester.pm'

fs.readFile(test_file, function (err, fileContent) {
  if (!err) {
    console.log(pm.prose(fileContent.toString(), { one: 1, two: 2, placeholder: 'placeholder', characters: 'characters',
    absPositiveNumber: '100', absNegativeNumber: '-200', rndfivepointthree: 5.3, rndfivepointfive: 5.5,
    rndfivepointseven: 5.7, rndfourpointfive: 4.5, rndword: 'word', oxen_count1: 1, oxen_count10: 10,
    geese_count1: 1, geese_count2: 2, zombie_count: 0.5, weekday3: 'Tuesday', day: 'day3' }))
  } else {
    console.log(err)
  }
})
