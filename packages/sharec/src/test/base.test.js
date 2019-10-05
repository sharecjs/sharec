const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const sharec = require('../')

describe('sharec', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('install', () => {
    const packageInstallJsonBaseFxt = fixtures(
      'package/json/03-base-install',
      'json',
    )
    const babelBaseFxt = fixtures('babel/json/01-base', 'json')
    const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')
    const eslintBaseFxtYaml = fixtures('eslint/yaml/01-base')

    it('should install configs to the target project', async () => {
      expect.assertions(5)

      const dir = {
        '/target/.eslintrc': JSON.stringify(eslintBaseFxt.current),
        '/target/babelrc.json': JSON.stringify(babelBaseFxt.current),
        '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
        '/target/package.json': JSON.stringify(
          packageInstallJsonBaseFxt.current,
        ),
        '/configuration-package/configs/.eslintrc': JSON.stringify(
          eslintBaseFxt.upcoming,
        ),
        '/configuration-package/configs/.eslintrc.yaml':
          eslintBaseFxtYaml.upcoming,
        '/configuration-package/configs/.editorconfig': 'bar',
        '/configuration-package/configs/babelrc.json': JSON.stringify(
          babelBaseFxt.upcoming,
        ),
        '/configuration-package/package.json': JSON.stringify({
          name: 'awesome-config',
          version: '1.0.0',
        }),
        '/configuration-package/configs/package.json': JSON.stringify(
          packageInstallJsonBaseFxt.upcoming,
        ),
      }
      vol.fromJSON(dir, '/')

      await sharec({
        configsPath: '/configuration-package',
        targetPath: '/target',
        command: 'install',
      })

      expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toEqual('bar')
      expect(
        JSON.parse(vol.readFileSync('/target/babelrc.json', 'utf8')),
      ).toEqual(babelBaseFxt.result)
      expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
        eslintBaseFxt.result,
      )
      expect(
        vol.readFileSync('/target/.eslintrc.yaml', 'utf8'),
      ).toWraplessEqual(eslintBaseFxtYaml.result)
      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toEqual(packageInstallJsonBaseFxt.result)
    })

    it('should not install any configs if target dependant of sharec', async () => {
      expect.assertions(5)

      const dir = {
        '/target/.eslintrc': JSON.stringify(eslintBaseFxt.current),
        '/target/babelrc.json': JSON.stringify(babelBaseFxt.current),
        '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
        '/target/package.json': JSON.stringify({
          ...packageInstallJsonBaseFxt.current,
          dependencies: {
            sharec: '1.0.0',
          },
        }),
        '/configuration-package/configs/.eslintrc': JSON.stringify(
          eslintBaseFxt.upcoming,
        ),
        '/configuration-package/configs/.eslintrc.yaml':
          eslintBaseFxtYaml.upcoming,
        '/configuration-package/configs/.editorconfig': 'bar',
        '/configuration-package/configs/babelrc.json': JSON.stringify(
          babelBaseFxt.upcoming,
        ),
        '/configuration-package/configs/package.json': JSON.stringify(
          packageInstallJsonBaseFxt.upcoming,
        ),
      }
      vol.fromJSON(dir, '/')

      await sharec({
        configsPath: '/configuration-package',
        targetPath: '/target',
        command: 'install',
      })

      expect(vol.readdirSync('/target')).not.toContain('.editorconfig')
      expect(
        JSON.parse(vol.readFileSync('/target/babelrc.json', 'utf8')),
      ).toEqual(babelBaseFxt.current)
      expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
        eslintBaseFxt.current,
      )
      expect(
        vol.readFileSync('/target/.eslintrc.yaml', 'utf8'),
      ).toWraplessEqual(eslintBaseFxtYaml.current)
      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toEqual({
        ...packageInstallJsonBaseFxt.current,
        dependencies: {
          sharec: '1.0.0',
        },
      })
    })
  })

  describe('remove', () => {
    const packageJsonBaseRemoveFxt = fixtures(
      'package/json/04-base-remove',
      'json',
    )
    const babelListedValuesFxt = fixtures('babel/json/04-listed-values', 'json')
    const eslintParserOptionsOperationsFxtYaml = fixtures(
      'eslint/yaml/02-parser-options-operations',
    )

    it('should remove configuration from target project', async () => {
      expect.assertions(4)

      const dir = {
        '/target/package.json': JSON.stringify(packageJsonBaseRemoveFxt.result),
        '/target/.eslintrc.yml': eslintParserOptionsOperationsFxtYaml.result,
        '/target/.babelrc': JSON.stringify(babelListedValuesFxt.result),
        '/configuration-package/configs/package.json': JSON.stringify(
          packageJsonBaseRemoveFxt.upcoming,
        ),
        '/configuration-package/package-lock.json': 'foo',
        '/configuration-package/configs/.eslintrc.yml':
          eslintParserOptionsOperationsFxtYaml.upcoming,
        '/configuration-package/configs/.babelrc': JSON.stringify(
          babelListedValuesFxt.upcoming,
        ),
      }
      vol.fromJSON(dir)

      await sharec({
        targetPath: '/target',
        configsPath: '/configuration-package',
        command: 'remove',
      })

      expect(vol.readFileSync('/target/.eslintrc.yml', 'utf8')).toWraplessEqual(
        eslintParserOptionsOperationsFxtYaml.restored,
      )
      expect(JSON.parse(vol.readFileSync('/target/.babelrc'))).toEqual(
        babelListedValuesFxt.restored,
      )
      expect(JSON.parse(vol.readFileSync('/target/package.json'))).toEqual(
        packageJsonBaseRemoveFxt.restored,
      )
      expect(vol.readdirSync('/target')).not.toContain('package-lock.json')
    })
  })
})
