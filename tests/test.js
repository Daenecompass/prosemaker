
"use strict";

let parser = require('../src/parser/pm');
let fs = require('fs');

fs.readFile('./tester.pm', function(err, data) {
    if (!err) {
        console.log('got file: ' + data);

        parser.parse(data);
    }
});

// parser.parse()
console.log(parser);