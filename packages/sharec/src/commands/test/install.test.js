const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { vol } = require('memfs')
const install = require('../install')

describe('commands > install >', () => {
  const packageJson01 = require('fixtures/package/package_01.json')
  const packageJson02 = require('fixtures/package/package_02.json')
  const babel01 = require('fixtures/babel/json/babel_01.json')
  const babel02 = require('fixtures/babel/json/babel_02.json')
  const eslint01 = require('fixtures/eslint/json/eslintrc_01.json')
  const eslint02 = require('fixtures/eslint/json/eslintrc_02.json')
  const yamlEslint01 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_01.yml',
    ),
    'utf8',
  )
  const yamlEslint02 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_02.yml',
    ),
    'utf8',
  )
  const npmignoreCurrent = readFileSync(
    path.resolve(__dirname, '../../../test/fixtures/npmignore/01/current.txt'),
    'utf8',
  )
  const npmignoreNew = readFileSync(
    path.resolve(__dirname, '../../../test/fixtures/npmignore/01/new.txt'),
    'utf8',
  )
  const npmignoreResult = readFileSync(
    path.resolve(__dirname, '../../../test/fixtures/npmignore/01/result.txt'),
    'utf8',
  )
  const gitignoreCurrent = readFileSync(
    path.resolve(__dirname, '../../../test/fixtures/gitignore/01/current.txt'),
    'utf8',
  )
  const gitignoreNew = readFileSync(
    path.resolve(__dirname, '../../../test/fixtures/gitignore/01/new.txt'),
    'utf8',
  )
  const gitignoreResult = readFileSync(
    path.resolve(__dirname, '../../../test/fixtures/gitignore/01/result.txt'),
    'utf8',
  )

  beforeEach(() => {
    vol.reset()
  })

  describe('configuration processing', () => {
    describe('invalid cases', () => {
      it('should stops if configuration directory is not exists', async () => {
        expect.assertions(1)

        const packageJson = {}
        const dir = {
          '/target/package.json': JSON.stringify(packageJson),
          '/configuration-package/package.json': JSON.stringify({
            version: '1.0.0',
          }),
          '/configuration-package/.editorconfig': 'bar',
        }

        vol.fromJSON(dir, '/')

        await install({
          configsPath: '/configuration-package',
          targetPath: '/target',
        })

        expect(
          JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
        ).toEqual(packageJson)
      })

      it('should not do anything if configs versions are equal already injected', async () => {
        expect.assertions(1)

        const packageJson = {
          sharec: {
            version: '1.0.0',
          },
        }
        const dir = {
          '/target/package.json': JSON.stringify(packageJson, null, 2),
          '/configuration-package/package.json': JSON.stringify({
            version: '1.0.0',
          }),
          '/configuration-package/configs/package.json': JSON.stringify(
            packageJson01,
          ),
        }

        vol.fromJSON(dir, '/')

        await install({
          configsPath: '/configuration-package',
          targetPath: '/target',
        })

        expect(
          JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
        ).toEqual(packageJson)
      })
    })

    describe('valid cases', () => {
      it('should merge all configs from target path', async () => {
        expect.assertions(9)

        const dir = {
          '/target/.eslintrc': JSON.stringify(eslint01),
          '/target/babelrc.js': JSON.stringify(babel01),
          '/target/.eslintrc.yaml': yamlEslint01,
          '/target/package.json': JSON.stringify(packageJson01, null, 2),
          '/target/.gitignore': gitignoreCurrent,
          '/target/.npmignore': npmignoreCurrent,
          '/configuration-package/package.json': JSON.stringify({
            version: '1.0.0',
          }),
          '/configuration-package/configs/.eslintrc': JSON.stringify(eslint02),
          '/configuration-package/configs/.eslintrc.yaml': yamlEslint02,
          '/configuration-package/configs/.editorconfig': 'bar',
          '/configuration-package/configs/.foo': JSON.stringify({
            foo: 'bar',
            bar: {
              foo: 'bar',
              bar: ['foo', 'bar'],
            },
          }),
          '/configuration-package/configs/babelrc.js': JSON.stringify(babel02),
          '/configuration-package/configs/package-lock.json': 'bar',
          '/configuration-package/configs/package.json': JSON.stringify(
            packageJson02,
          ),
          '/configuration-package/configs/.gitignore': gitignoreNew,
          '/configuration-package/configs/.npmignore': npmignoreNew,
        }

        vol.fromJSON(dir, '/')

        await install({
          configsPath: '/configuration-package',
          targetPath: '/target',
        })

        expect(vol.readdirSync('/target')).not.toContain('package-lock.json')
        expect(
          vol.readFileSync('/target/.editorconfig', 'utf8'),
        ).toMatchSnapshot()
        expect(vol.readFileSync('/target/babelrc.js', 'utf8')).toMatchSnapshot()
        expect(
          JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8')),
        ).toMatchSnapshot()
        expect(
          vol.readFileSync('/target/.eslintrc.yaml', 'utf8'),
        ).toMatchSnapshot()
        expect(
          vol.readFileSync('/target/package.json', 'utf8'),
        ).toMatchSnapshot()
        expect(
          JSON.parse(vol.readFileSync('/target/.foo', 'utf8')),
        ).toMatchSnapshot()
        expect(vol.readFileSync('/target/.gitignore', 'utf8')).toEqual(
          gitignoreResult,
        )
        expect(vol.readFileSync('/target/.npmignore', 'utf8')).toEqual(
          npmignoreResult,
        )
      })
    })
  })
})
