const { createFakeSpinner, createFakePrompt } = require('testUtils')
const { InternalError, CAUSES } = require('../../errors')
const isDependantOfSharec = require('../isDependantOfSharec')

describe('steps > isDependantOfSharec', () => {
  let spinner
  let prompt

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
  })

  it('should just return given input if target project is independant of sharec', () => {
    const input = {
      targetPackage: {
        dependencies: {},
      },
    }
    const output = isDependantOfSharec({ spinner, prompt })(input)

    expect(output).toEqual(output)
  })

  it('should throw an error if target project depends of sharec', () => {
    const input = {
      targetPackage: {
        dependencies: {
          sharec: 'any',
        },
      },
    }

    try {
      isDependantOfSharec({ spinner, prompt })(input)
    } catch (err) {
      expect(err).toBeInstanceOf(InternalError)
      expect(err.cause).toBe(CAUSES.IS_DEPENDANT_OF_SHAREC.symbol)
    }
  })
})
