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

      it('should not do anything if config already injected', async () => {
        expect.assertions(1)

        const packageJson = {
          sharec: {
            injected: true,
          },
        }
        const dir = {
          '/target/package.json': JSON.stringify(packageJson, null, 2),
          '/configuration-package/configs/package.json': JSON.stringify(
            packageJson01,
            null,
            2,
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
        expect.assertions(6)

        const dir = {
          '/target/.eslintrc': JSON.stringify(eslint01),
          '/target/babelrc.js': JSON.stringify(babel01),
          '/target/.eslintrc.yaml': yamlEslint01,
          '/target/package.json': JSON.stringify(packageJson01, null, 2),
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
          '/configuration-package/configs/package.json': JSON.stringify(
            packageJson02,
            null,
            2,
          ),
        }

        vol.fromJSON(dir, '/')

        await install({
          configsPath: '/configuration-package',
          targetPath: '/target',
        })

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
      })

      //       it('should backup origin configuration to sharec-lock.json file', async () => {
      //         expect.assertions(1)
      //
      //         const dir = {
      //           '/target/.eslintrc': JSON.stringify(eslint01),
      //           '/target/babelrc.js': JSON.stringify(babel01),
      //           '/target/.eslintrc.yaml': yamlEslint01,
      //           '/target/package.json': JSON.stringify(packageJson01, null, 2),
      //           '/configuration-package/configs/.eslintrc': JSON.stringify(eslint02),
      //           '/configuration-package/configs/.eslintrc.yaml': yamlEslint02,
      //           '/configuration-package/configs/.editorconfig': 'bar',
      //           '/configuration-package/configs/babelrc.js': JSON.stringify(babel02),
      //           '/configuration-package/configs/package.json': JSON.stringify(
      //             packageJson02,
      //             null,
      //             2,
      //           ),
      //         }
      //
      //         vol.fromJSON(dir, '/')
      //
      //         await install({
      //           configsPath: '/configuration-package',
      //           targetPath: '/target',
      //         })
      //
      //         expect(
      //           vol.readFileSync('/target/sharec-lock.json', 'utf8'),
      //         ).toMatchSnapshot()
      //       })
    })
  })
})
