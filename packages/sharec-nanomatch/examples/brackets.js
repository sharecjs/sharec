var nm = require('..')

var re = nm.makeRe('[]a-]')
console.log(re)

console.log(/^(?:a[\\]a\\-]b)$/.test('aab'))
