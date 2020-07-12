const { vol } = require('memfs')
const { createFakeSpinner, createFakePrompt } = require('testUtils')
const readUpcomingPackage = require('../readUpcomingPackage')

describe('steps > readUpcomingPackage', () => {
  let spinner
  let prompt
  const input = { configPath: '/configs' }

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
    vol.reset()
  })

  it('should read package.json from upcoming config', async () => {
    const spinner = createFakeSpinner()
    const packageJson = {
      foo: 'bar',
      bar: 'baz',
      baz: 'foo',
    }
    const dir = {
      'package.json': JSON.stringify(packageJson),
    }

    vol.fromJSON(dir, input.configPath)

    const output = await readUpcomingPackage({ spinner, prompt })(input)

    expect(output).toEqual({
      ...input,
      upcomingPackage: packageJson,
    })
  })

  it('should throw an error if package.json is not exist in upcoming config', async (done) => {
    const spinner = createFakeSpinner()
    const dir = {}

    vol.fromJSON(dir, input.configPath)

    try {
      await readUpcomingPackage({ spinner, prompt })(input)
    } catch (err) {
      done()
    }
  })
})
