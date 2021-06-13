var nm = require('..')
var fixtures = ['bar/bar']
var result = nm(fixtures, ['foo/**', '!foo/baz'])
console.log(result)
