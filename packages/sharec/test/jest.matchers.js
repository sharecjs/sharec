expect.extend({
  /**
   * This matcher requres for windows testsing and "lines" based configuration
   * like YAML files or .gitignore
   * There are a lot of different ways to do it correct, but in current moment -
   * jest-matcher is the best and simple solution
   */
  toWraplessEqual(rawReceived, rawExpected, options = {}) {
    const normalizeWraps = (str) => str.replace(/(\r\n|\n\r|\r|\n)/gm, '\n')

    let normalizedReceived = normalizeWraps(rawReceived)
    let normalizedExpected = normalizeWraps(rawExpected)

    if (options.eol === false) {
      normalizedReceived = normalizedReceived.replace(/\n$/, '')
      normalizedExpected = normalizedExpected.replace(/\n$/, '')
    }

    expect(normalizedReceived).toEqual(normalizedExpected)

    return {
      pass: true,
    }
  },
})
