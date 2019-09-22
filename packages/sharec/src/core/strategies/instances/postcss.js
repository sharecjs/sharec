const Strategy = require('../Strategy')
const { mergeHashes } = require('../../../utils/hashes')

class PostcssStrategy extends Strategy {
  mergeJSON({ current = {}, upcoming = {} }) {
    if (!upcoming.plugins) {
      return current
    }

    if (!current.plugins && upcoming.plugins) {
      return upcoming
    }

    return {
      // TODO: check, whats wrong with "mergeHashesWithKeys" here
      plugins: mergeHashes(current.plugins, upcoming.plugins),
    }
  }
}

const postcssStrategy = new PostcssStrategy({
  matchers: {
    json: ['postcss'],
  },
})

module.exports = {
  PostcssStrategy,
  postcssStrategy,
}
