const { fixture } = require('testUtils')
const { vol } = require('memfs')
const { removeConfig } = require('../remove')

describe('processors > configs >', () => {
  const eslint04 = fixture('eslint/json/eslintrc_04.json', 'json')
  const eslint05 = fixture('eslint/json/eslintrc_05.json', 'json')
  const yamlEslint04 = fixture('eslint/yaml/eslintrc_04.yml')
  const yamlEslint05 = fixture('eslint/yaml/eslintrc_05.yml')

  beforeEach(() => {
    vol.reset()
  })

  describe('removeConfig', () => {
    it('should remove configs from exist JSON file', async () => {
      expect.assertions(1)

      const dir = {
        '/target/.eslintrc': JSON.stringify(eslint04),
        '/configuration-package/.eslintrc': JSON.stringify(eslint05),
      }

      vol.fromJSON(dir)

      await removeConfig({
        configsPath: '/configuration-package',
        targetPath: '/target',
        filePath: '.eslintrc',
      })

      expect(
        JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8')),
      ).toMatchSnapshot()
    })

    it('should remove configs from exist YAML file', async () => {
      expect.assertions(1)

      const dir = {
        '/target/.eslintrc.yaml': yamlEslint04,
        '/configuration-package/.eslintrc.yaml': yamlEslint05,
      }

      vol.fromJSON(dir)

      await removeConfig({
        configsPath: '/configuration-package',
        targetPath: '/target',
        filePath: '.eslintrc.yaml',
      })

      expect(
        vol.readFileSync('/target/.eslintrc.yaml', 'utf8'),
      ).toMatchSnapshot()
    })

    it('should delete exist JSON config file if target file was not changed', async () => {
      expect.assertions(1)

      const dir = {
        '/target/.eslintrc': JSON.stringify(eslint04),
        '/configuration-package/.eslintrc': JSON.stringify(eslint04),
      }

      vol.fromJSON(dir)

      await removeConfig({
        configsPath: '/configuration-package',
        targetPath: '/target',
        filePath: '.eslintrc',
      })

      expect(vol.readdirSync('/target')).not.toContain('.eslintrc')
    })
  })
})
