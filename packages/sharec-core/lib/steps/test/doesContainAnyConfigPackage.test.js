const { InternalError } = require('../../errors')
const doesContainAnyConfigPackage = require('../doesContainAnyConfigPackage')

describe('steps > doesContainAnyConfigPackage', () => {
  it('returns given input if target package contains any config', () => {
    const input = {
      targetPackage: {
        sharec: {
          configs: ['awesome-config'],
        },
        devDependencies: {
          'awesome-config': '1.0.0',
        },
      },
    }

    expect(() => doesContainAnyConfigPackage(input)).not.toThrow()
  })

  it("throws an error if target project doesn't contain any config", () => {
    const input = {
      targetPackage: {
        sharec: {},
        devDependencies: {},
      },
    }

    expect(() => doesContainAnyConfigPackage(input)).rejects.toThrow(InternalError)
  })
})
