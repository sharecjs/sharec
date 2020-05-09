expect.extend({
  /**
   * This matcher requres for windows testsing and "lines" based configuration
   * like YAML files or .gitignore
   * There are a lot of different ways to do it correct, but in current moment -
   * jest-matcher is the best and simple solution
   */
  toWraplessEqual(rawReceived, rawExpected) {
    const normalizeWraps = (str) => str.replace(/(\r\n|\n\r|\r|\n)/g, '\n').replace(/\n$/, '')
    const normalizedReceived = normalizeWraps(rawReceived)
    const normalizedExpected = normalizeWraps(rawExpected)

    expect(normalizedReceived).toEqual(normalizedExpected)

    return {
      pass: true,
    }
  },
})
