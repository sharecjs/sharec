var nm = require('..')

var re = nm.makeRe('D://*')
console.log(re)
console.log(re.test('D://foo'))
