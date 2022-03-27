const { toWraplessEqual, toMatchFxt } = require('./matchers')

expect.extend({
  toWraplessEqual,
  toMatchFxt,
})
