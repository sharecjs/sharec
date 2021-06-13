var mm = require('minimatch')
var nm = require('..')

console.log(
  nm.match(
    ['/a', '/b', 'a', 'b', 'a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a', 'x/y', 'z/z'],
    '*/*',
  ),
)
console.log(
  mm.match(
    ['/a', '/b', 'a', 'b', 'a/a', 'a/b', 'a/c', 'a/x', 'a/a/a', 'a/a/b', 'a/a/a/a', 'a/a/a/a/a', 'x/y', 'z/z'],
    '*/*',
  ),
)
console.log()
console.log(nm.match(['/z.js', 'z.js'], '**/z*'))
console.log(mm.match(['/z.js', 'z.js'], '**/z*'))
console.log()
console.log(nm.match(['/z.js', 'z.js', '/zx', 'zx'], '/**/z*'))
console.log(mm.match(['/z.js', 'z.js', '/zx', 'zx'], '/**/z*'))
console.log()
console.log(nm.match(['/z.js'], '**/z*'))
console.log(mm.match(['/z.js'], '**/z*'))
console.log()
console.log(nm.match(['a/b/c/d'], '**/**/d*'))
console.log(mm.match(['a/b/c/d'], '**/**/d*'))
console.log()
console.log(nm.match(['a/b/c/d'], '**/d*'))
console.log(mm.match(['a/b/c/d'], '**/d*'))
console.log()
console.log(nm.match(['a/b/c/d'], '/**', { dot: true }))
console.log(mm.match(['a/b/c/d'], '/**', { dot: true }))
console.log()
console.log(nm.match(['a/b/c/d', '/a/b/c/d', '/d'], '/**/d*'))
console.log(mm.match(['a/b/c/d', '/a/b/c/d', '/d'], '/**/d*'))
console.log()
console.log(nm.match(['z.js'], '**/z*'))
console.log(mm.match(['z.js'], '**/z*'))
console.log()
console.log(nm.match(['.a/a', 'x/y', 'z/z'], '*/*'))
console.log(mm.match(['.a/a', 'x/y', 'z/z'], '*/*'))
console.log()
console.log(nm.match(['.a/a', 'x/y', 'z/z'], '*/*', { dot: true }))
console.log(mm.match(['.a/a', 'x/y', 'z/z'], '*/*', { dot: true }))
console.log()
console.log(nm.match(['.a/a', 'x/y', 'z/z', 'a/a'], '*/*', { dot: true, ignore: 'a/*' }))
console.log(mm.match(['.a/a', 'x/y', 'z/z', 'a/a'], '*/*', { dot: true, ignore: 'a/*' }))
console.log()
console.log(mm.makeRe('*/*'))
console.log(nm.makeRe('*/*'))
