const { vol } = require('memfs')
const { createFakeSpinner, createFakePrompt } = require('testUtils')
const readTargetPackage = require('../readTargetPackage')

describe('steps > readTargetPackage', () => {
  let prompt
  const input = { targetPath: '/configs' }

  beforeEach(() => {
    prompt = createFakePrompt()
    vol.reset()
  })

  it('should read package.json from target project', async () => {
    const spinner = createFakeSpinner()
    const packageJson = {
      foo: 'bar',
      bar: 'baz',
      baz: 'foo',
    }
    const dir = {
      'package.json': JSON.stringify(packageJson),
    }

    vol.fromJSON(dir, input.targetPath)

    const output = await readTargetPackage({ spinner, prompt })(input)

    expect(output).toEqual({
      ...input,
      targetPackage: packageJson,
    })
  })

  it('should throw an error if package.json is not exist in target project', async (done) => {
    const spinner = createFakeSpinner()
    const dir = {}

    vol.fromJSON(dir, input.targetPath)

    try {
      await readTargetPackage({ spinner, prompt })(input)
    } catch (err) {
      done()
    }
  })
})
