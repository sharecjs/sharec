'use strict'

var nm = require('..')
var res = nm.create('abc/*.js', { sourcemap: true })
console.log(res.map)
// { version: 3,
//   sources: [ 'string' ],
//   names: [],
//   mappings: 'AAAA,GAAG,EAAC,iBAAC,EAAC,EAAE',
//   sourcesContent: [ 'abc/*.js' ] }

var ast = nm.parse('abc/**/*.js')
var res = nm.compile(ast, { sourcemap: true })
console.log(res.map)
// { version: 3,
//   sources: [ 'string' ],
//   names: [],
//   mappings: 'AAAA,GAAG,EAAC,iBAAC,EAAC,EAAE',
//   sourcesContent: [ 'abc/*.js' ] }
