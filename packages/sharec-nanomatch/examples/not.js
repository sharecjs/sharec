var nm = require('..')

console.log(nm.not(['z.js', 'a.js'], '**/z*'))
console.log(nm.not(['a/a/a', 'a/a/b', 'b/b/a', , 'b/b/b', 'c/c/a', 'c/c/b', 'c/c/c'], '**/a', { ignore: ['**/c'] }))

console.log(nm.not(['a.a', 'a.b', 'b.a'], '*.a'))
//= > ['a.b']
