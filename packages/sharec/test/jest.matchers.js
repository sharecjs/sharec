// TODO: works awfull, need to rewrite all matchers
const diff = require('jest-diff')

expect.extend({
  toWraplessEqual(rawReceived, rawExpected) {
    const options = {
      comment: 'Strings equality with ignoring of \\n and \\n\\r',
      isNot: this.isNot,
      promise: this.promise,
    }
    const normalizeWraps = str => str.replace(/(\r\n|\n\r)/gi, '\n')
    const [received, expected] = [rawReceived, rawExpected].map(arg =>
      normalizeWraps(arg),
    )
    const pass = received === expected
    const messageParts = [
      this.utils.matcherHint('toWraplessEqual', undefined, undefined, options),
      '\n',
    ]

    if (pass) {
      messageParts.push(
        ...[
          `Expected: ${this.utils.printExpected(expected)}`,
          `Received: ${this.utils.printExpected(received)}`,
        ],
      )

      return {
        actual: received,
        message: () => messageParts.join('\n'),
        pass,
      }
    }

    const diffString = diff(received, expected, {
      expand: this.expand,
    })

    if (diffString && diffString.includes('- Expect')) {
      messageParts.push(['Difference:\n', diffString])
    } else {
      messageParts.push(
        ...[
          `Expected: ${this.utils.printExpected(expected)}`,
          `Received: ${this.utils.printExpected(received)}`,
        ],
      )
    }

    return {
      actual: received,
      message: () => messageParts.join('\n'),
      pass,
    }
  },
})
