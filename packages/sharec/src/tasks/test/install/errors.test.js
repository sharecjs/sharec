const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('tasks > install > errors >', () => {
  const packageInstallJsonBaseFxt = fixtures('package/03-base-install', 'json')
  const babelBaseFxt = fixtures('babel/json/01-base', 'json')
  const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')
  const eslintBaseFxtYaml = fixtures('eslint/yaml/01-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should throw an error if configuration with the same version already installed', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify({
        sharec: {
          version: '1.0.0',
        },
      }),
      '/configuration-package/configs/.editorconfig': 'bar',
    }
    vol.fromJSON(dir, '/')

    try {
      await install({
        configsPath: '/configuration-package',
        targetPath: '/target',
        configsVersion: '1.0.0',
        configsName: 'awesome-config',
      })
    } catch (err) {
      expect(err.message).toBe('Configs already installed!')
    }
  })

  it('should throw an error if configuration package was not found', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify({}),
    }
    vol.fromJSON(dir, '/')

    try {
      await install({
        configsPath: '/configuration-package',
        configsName: 'awesome-config',
        targetPath: '/target',
      })
    } catch (err) {
      expect(err.message).toContain('ENOENT')
    }
  })
})
