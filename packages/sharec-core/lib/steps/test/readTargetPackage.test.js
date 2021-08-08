const { vol } = require('memfs')
const readTargetPackage = require('../readTargetPackage')

describe('steps > readTargetPackage', () => {
  const input = { targetPath: '/configs' }

  beforeEach(() => {
    vol.reset()
  })

  it('should read package.json from target project', async () => {
    const packageJson = {
      foo: 'bar',
      bar: 'baz',
      baz: 'foo',
    }
    const dir = {
      'package.json': JSON.stringify(packageJson),
    }

    vol.fromJSON(dir, input.targetPath)

    const output = await readTargetPackage(input)

    expect(output).toEqual({
      ...input,
      targetPackage: packageJson,
    })
  })

  it('should throw an error if package.json is not exist in target project', async (done) => {
    const dir = {}

    vol.fromJSON(dir, input.targetPath)

    try {
      await readTargetPackage(input)
    } catch (err) {
      done()
    }
  })
})
