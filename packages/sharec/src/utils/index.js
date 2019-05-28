const pipe = (...funs) => (...args) =>
  funs.reduce((acc, fun, i) => (i === 0 ? fun(...args) : fun(acc)), null)

module.exports = {
  pipe,
}
