
"use strict";

let parser = require('../src/parser/pm')
let fs = require('fs')

let test_file = '' + __dirname.split('/').pop() + '/tester.pm'

fs.readFile(test_file, function(err, data) {
    if (!err) {
        console.log('got file: ' + data)
        console.log(parser.parse(data))
    } else {
        console.log(err)
    }
});
