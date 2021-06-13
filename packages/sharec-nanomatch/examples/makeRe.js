var mm = require('minimatch')
var nm = require('..')

var re = nm.makeRe('*[a-b].[a-b]*')
console.log(re)
console.log(re.test('c.a'))

var re = nm.makeRe('/**')
console.log(re)
console.log(re.test('/a/b'))

var re = mm.makeRe('*[a-b].[a-b]*')
console.log(re)
console.log(re.test('c.a'))

var re = mm.makeRe('/**')
console.log(re)
console.log(re.test('/a/b'))

// console.log(/[^/]*?[a-b].[a-b][^/]*?/.test('c.a'))
