const Strategy = require('../Strategy')

class BrowserslistStrategy extends Strategy {}

const browserslistStrategy = new BrowserslistStrategy({
  matchers: {
    json: ['browserslist'],
    lines: ['.browserslistrc'],
  },
})

module.exports = {
  BrowserslistStrategy,
  browserslistStrategy,
}
