const { fixture } = require('testUtils')
const { vol } = require('memfs')
const { installConfig } = require('../install')

describe('processors > configs >', () => {
  const eslint01 = fixture('eslint/json/eslintrc_01.json', 'json')
  const eslint02 = fixture('eslint/json/eslintrc_02.json', 'json')
  const yamlEslint01 = fixture('eslint/yaml/eslintrc_01.yml')
  const yamlEslint02 = fixture('eslint/yaml/eslintrc_02.yml')

  beforeEach(() => {
    vol.reset()
  })

  describe('installConfig', () => {
    it('should merge JSON configs', async () => {
      expect.assertions(1)

      const dir = {
        '/target/.eslintrc': JSON.stringify(eslint01),
        '/configs/.eslintrc': JSON.stringify(eslint02),
      }
      vol.fromJSON(dir, '/')

      await installConfig({
        configsPath: '/configs',
        targetPath: '/target',
        filePath: '.eslintrc',
      })

      const res = await vol.readFileSync('/target/.eslintrc', 'utf8')

      expect(JSON.parse(res)).toMatchSnapshot()
    })

    it('should merge YAML configs', async () => {
      expect.assertions(1)

      const dir = {
        '/target/.eslintrc.yaml': yamlEslint01,
        '/configs/.eslintrc.yaml': yamlEslint02,
      }
      vol.fromJSON(dir, '/')

      await installConfig({
        configsPath: '/configs',
        targetPath: '/target',
        filePath: '.eslintrc.yaml',
      })

      const res = await vol.readFileSync('/target/.eslintrc.yaml', 'utf8')

      expect(res).toMatchSnapshot()
    })

    it('should copy all non-mergeable configs', async () => {
      expect.assertions(1)

      const dir = {
        '/configs/.editorconfig': 'bar',
      }
      vol.fromJSON(dir, '/')

      await installConfig({
        configsPath: '/configs',
        targetPath: '/target',
        filePath: '.editorconfig',
      })

      const res = await vol.readFileSync('/target/.editorconfig', 'utf8')

      expect(res).toEqual('bar')
    })

    it('should correctly process configs with mixed file structure', async () => {
      expect.assertions(1)

      const dir = {
        '/configs/foo/bar/.editorconfig': 'bar',
      }
      vol.fromJSON(dir, '/')

      await installConfig({
        configsPath: '/configs',
        targetPath: '/target',
        filePath: 'foo/bar/.editorconfig',
      })

      const res = await vol.readFileSync(
        '/target/foo/bar/.editorconfig',
        'utf8',
      )

      expect(res).toEqual('bar')
    })
  })
})
