const mm = require('..')
const files = ['a/b', 'c/d/', 'e/f', 'a', 'b', 'c/']

console.log(mm(files, '**/*', { ignore: ['**/'] }))
//= > [ 'a/b', 'e/f', 'a', 'b' ]
