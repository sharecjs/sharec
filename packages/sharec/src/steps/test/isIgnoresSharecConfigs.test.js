const { createFakeSpinner, createFakePrompt } = require('testUtils')
const { InternalError, CAUSES } = require('../../errors')
const isIgnoresSharecConfigs = require('../isIgnoresSharecConfigs')

describe('steps > isIgnoresSharecConfigs', () => {
  let spinner
  let prompt

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
  })

  it('should just return given input if target project is not ignore sharec', () => {
    const input = {
      sharec: {
        name: 'awesome-config',
      },
    }
    const output = isIgnoresSharecConfigs({ spinner, prompt })(input)

    expect(output).toEqual(output)
  })

  it('should throw an error if target project ignores sharec', () => {
    const input = {
      sharec: {
        ignore: true,
      },
    }

    try {
      isIgnoresSharecConfigs({ spinner, prompt })(input)
    } catch (err) {
      expect(err).toBeInstanceOf(InternalError)
      expect(err.cause).toBe(CAUSES.IS_IGNORES_SHAREC[1])
    }
  })
})
