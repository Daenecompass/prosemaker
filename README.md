
ProseMaker
==========

**Document assembly for scientific reporting**

[![build status](https://travis-ci.org/DanielBaird/prosemaker.svg?branch=js-peg)](https://travis-ci.org/DanielBaird/prosemaker)
[![npm version](https://img.shields.io/npm/v/prosemaker.svg)](https://www.npmjs.com/package/prosemaker)
[![js standard style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is the new JS version of ProseMaker, which will eventually become
ProseMaker 3.0.

It's unusable at the moment.  If you want document assembly, go to the master
branch of this repo and write a little python rigging to call the ProseMaker
library.

To develop this JS version:

- clone via git    
- install dependencies with `npm install`
- edit code, occasionally running `npm run lint`
- compile and test with `npm run dev` (or `npm run` and peruse the list)

Commands to do that:
```sh
git clone https://github.com/DanielBaird/prosemaker.git
cd prosemaker
npm install
# edit stuff...
npm run lint # to check your coding style (DON'T ARGUE WITH STANDARD JS)
npm run dev # to lint, clean, build and test
```
