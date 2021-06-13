var nm = require('..')
var pattern = './something/*.js'

console.log(nm.isMatch('./something/file.js', pattern))
console.log(nm.makeRe(pattern).test('./something/file.js'))
console.log(nm.makeRe(pattern))

var pattern = 'something/*.js'

console.log(nm.isMatch('./something/file.js', pattern))
console.log(nm.makeRe(pattern).test('./something/file.js'))
console.log(nm.makeRe(pattern))
