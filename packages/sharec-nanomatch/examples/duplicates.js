var nm = require('..')
console.log(nm.match(['a.js', 'a.txt'], './**/**/**/*.js'))
//= > [ 'a.js' ]
