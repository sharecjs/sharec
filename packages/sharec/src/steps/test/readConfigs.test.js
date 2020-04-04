const { vol } = require('memfs')
const { createFakeSpinner } = require('testUtils')
const { InternalError, CAUSES } = require('../../errors')
const readConfigs = require('../readConfigs')

describe('steps > readConfigs', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should read package.json from target project', async () => {
    const spinner = createFakeSpinner()
    const input = {
      configPath: '/',
      options: {},
    }
    const dir = {
      'package.json': 'foo',
      '.eslintrc': 'bar',
      'package-lock.json': 'baz',
      'yarn.lock': 'foo',
    }
    vol.fromJSON(dir, '/configs')

    const output = await readConfigs(spinner)(input)

    expect(output).toEqual({
      ...input,
      configs: {
        'package.json': 'foo',
        '.eslintrc': 'bar',
      },
    })
  })

  it('should throw an error if package.json is not exist in target project', async () => {
    const spinner = createFakeSpinner()
    const input = {
      configPath: '/foo',
    }
    const dir = {}
    vol.fromJSON(dir, '/bar')

    try {
      await readConfigs(spinner)(input)
    } catch (err) {
      expect(err).toBeInstanceOf(InternalError)
      expect(err.cause).toBe(CAUSES.CONFIGS_NOT_FOUND.symbol)
      expect(err.message).toEqual('Configuration files were not found in "/foo/configs"')
    }
  })
})
