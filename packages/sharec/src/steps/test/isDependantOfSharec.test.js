const { createFakeSpinner } = require('testUtils')
const { InternalError, CAUSES } = require('../../errors')
const isDependantOfSharec = require('../isDependantOfSharec')

describe('steps > isDependantOfSharec', () => {
  it('should just return given input if target project is independant of sharec', () => {
    const spinner = createFakeSpinner()
    const input = {
      targetPackage: {
        dependencies: {},
      },
    }
    const output = isDependantOfSharec(spinner)(input)

    expect(output).toEqual(output)
  })

  it('should throw an error if target project depends of sharec', () => {
    const spinner = createFakeSpinner()
    const input = {
      targetPackage: {
        dependencies: {
          sharec: 'any',
        },
      },
    }

    try {
      isDependantOfSharec(spinner)(input)
    } catch (err) {
      expect(err).toBeInstanceOf(InternalError)
      expect(err.cause).toBe(CAUSES.IS_DEPENDANT_OF_SHAREC.symbol)
    }
  })
})
