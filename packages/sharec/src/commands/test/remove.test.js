const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { vol } = require('memfs')
const remove = require('../remove')

describe('commands > remove >', () => {
  const packageJson5 = require('../../../test/fixtures/package/package_05.json')
  const packageJson6 = require('../../../test/fixtures/package/package_06.json')
  const babel10 = require('fixtures/babel/json/babel_10.json')
  const babel11 = require('fixtures/babel/json/babel_11.json')
  const eslint04 = require('fixtures/eslint/json/eslintrc_04.json')
  const eslint05 = require('fixtures/eslint/json/eslintrc_05.json')
  const yamlEslint04 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_04.yml',
    ),
    'utf8',
  )
  const yamlEslint05 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_05.yml',
    ),
    'utf8',
  )

  beforeEach(() => {
    vol.reset()
  })

  describe('configuration removing', () => {
    describe('invalid cases', () => {
      it('should not do anything if configs were not injected', async () => {
        expect.assertions(2)

        const packageJson = {}
        const dir = {
          '/target/package.json': JSON.stringify(packageJson),
          '/target/.eslintrc': JSON.stringify(eslint04),
          '/configuration-package/.eslintrc': JSON.stringify(eslint05),
        }

        vol.fromJSON(dir)

        await remove({
          targetPath: '/target',
          configsPath: '/configuration-package',
        })

        expect(JSON.parse(vol.readFileSync('/target/.eslintrc'))).toEqual(
          eslint04,
        )
        expect(
          JSON.parse(vol.readFileSync('/target/package.json')).sharec,
        ).toBeUndefined()
      })

      it('should not do anything if configs path is not passed', async () => {
        expect.assertions(2)

        const packageJson = {}
        const dir = {
          '/target/package.json': JSON.stringify(packageJson),
          '/target/.eslintrc': JSON.stringify(eslint04),
          '/configuration-package/.eslintrc': JSON.stringify(eslint05),
        }

        vol.fromJSON(dir)

        await remove({
          targetPath: '/target',
        })

        expect(JSON.parse(vol.readFileSync('/target/.eslintrc'))).toEqual(
          eslint04,
        )
        expect(
          JSON.parse(vol.readFileSync('/target/package.json')).sharec,
        ).toBeUndefined()
      })

      it('should should stops if configuration directory is not exists', async () => {
        expect.assertions(2)

        const packageJson = {}
        const dir = {
          '/target/package.json': JSON.stringify(packageJson),
          '/target/.eslintrc': JSON.stringify(eslint04),
        }

        vol.fromJSON(dir)

        await remove({
          targetPath: '/target',
          configsPath: '/configuration-package',
        })

        expect(JSON.parse(vol.readFileSync('/target/.eslintrc'))).toEqual(
          eslint04,
        )
        expect(
          JSON.parse(vol.readFileSync('/target/package.json')).sharec,
        ).toBeUndefined()
      })
    })
  })

  describe('valid cases', () => {
    it('should remove configuration from target all files and delete all empty', async () => {
      expect.assertions(3)

      const packageJson = {
        sharec: {
          injected: true,
        },
      }
      const dir = {
        '/target/package.json': JSON.stringify(packageJson),
        '/target/.eslintrc': JSON.stringify(eslint04),
        '/target/.babelrc': JSON.stringify(babel11),
        '/configuration-package/configs/.eslintrc': JSON.stringify(eslint05),
        '/configuration-package/configs/.babelrc': JSON.stringify(babel11),
      }

      vol.fromJSON(dir)

      await remove({
        targetPath: '/target',
        configsPath: '/configuration-package',
      })

      expect(
        JSON.parse(vol.readFileSync('/target/package.json')),
      ).toMatchSnapshot()
      expect(
        JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8')),
      ).toMatchSnapshot()
      expect(vol.readdirSync('/target')).not.toContain('.babelrc')
    })

    it('should remove configuration from package.json', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify(packageJson5),
        '/configuration-package/configs/package.json': JSON.stringify(
          packageJson6,
        ),
      }
      vol.fromJSON(dir)

      await remove({
        targetPath: '/target',
        configsPath: '/configuration-package',
      })

      expect(
        JSON.parse(vol.readFileSync('/target/package.json')),
      ).toMatchSnapshot()
    })

    it('should remove configuration from package.json and other matched files', async () => {
      expect.assertions(4)

      const dir = {
        '/target/package.json': JSON.stringify(packageJson5),
        '/target/.eslintrc.yml': yamlEslint04,
        '/target/.babelrc': JSON.stringify(babel10),
        '/configuration-package/configs/package.json': JSON.stringify(
          packageJson6,
        ),
        '/configuration-package/package-lock.json': 'foo',
        '/configuration-package/configs/.eslintrc.yml': yamlEslint05,
        '/configuration-package/configs/.babelrc': JSON.stringify(babel11),
      }
      vol.fromJSON(dir)

      await remove({
        targetPath: '/target',
        configsPath: '/configuration-package',
      })

      expect(
        vol.readFileSync('/target/.eslintrc.yml', 'utf8'),
      ).toMatchSnapshot()
      expect(JSON.parse(vol.readFileSync('/target/.babelrc'))).toMatchSnapshot()
      expect(
        JSON.parse(vol.readFileSync('/target/package.json')),
      ).toMatchSnapshot()
      expect(vol.readdirSync('/target')).not.toContain('package-lock.json')
    })
  })
})
