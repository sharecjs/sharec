const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const remove = require('../../remove')

describe('commands > remove >', () => {
  const packageJsonBaseRemoveFxt = fixtures('package/04-base-remove', 'json')
  const babelListedValuesFxt = fixtures('babel/json/04-listed-values', 'json')
  const eslintParserOptionsOperationsFxt = fixtures(
    'eslint/json/02-parser-options-operations',
    'json',
  )
  const eslintParserOptionsOperationsFxtYaml = fixtures(
    'eslint/yaml/02-parser-options-operations',
  )

  beforeEach(() => {
    vol.reset()
  })

  it('should remove configuration from target all files and delete all empty', async () => {
    expect.assertions(3)

    const packageJson = {
      sharec: {
        injected: true,
      },
    }
    const dir = {
      '/target/package.json': JSON.stringify(packageJson),
      '/target/.eslintrc': JSON.stringify(
        eslintParserOptionsOperationsFxt.result,
      ),
      '/target/.babelrc': JSON.stringify(babelListedValuesFxt.result),
      '/configuration-package/configs/.eslintrc': JSON.stringify(
        eslintParserOptionsOperationsFxt.new,
      ),
      '/configuration-package/configs/.babelrc': JSON.stringify(
        babelListedValuesFxt.result,
      ),
    }

    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(JSON.parse(vol.readFileSync('/target/package.json'))).toEqual({})
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintParserOptionsOperationsFxt.restored,
    )
    expect(vol.readdirSync('/target')).not.toContain('.babelrc')
  })

  it('should remove configuration from package.json', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify(packageJsonBaseRemoveFxt.result),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonBaseRemoveFxt.new,
      ),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(JSON.parse(vol.readFileSync('/target/package.json'))).toEqual(
      packageJsonBaseRemoveFxt.restored,
    )
  })

  it('should remove configuration from package.json and other matched files', async () => {
    expect.assertions(4)

    const dir = {
      '/target/package.json': JSON.stringify(packageJsonBaseRemoveFxt.result),
      '/target/.eslintrc.yml': eslintParserOptionsOperationsFxtYaml.result,
      '/target/.babelrc': JSON.stringify(babelListedValuesFxt.result),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonBaseRemoveFxt.new,
      ),
      '/configuration-package/package-lock.json': 'foo',
      '/configuration-package/configs/.eslintrc.yml':
        eslintParserOptionsOperationsFxtYaml.new,
      '/configuration-package/configs/.babelrc': JSON.stringify(
        babelListedValuesFxt.new,
      ),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(vol.readFileSync('/target/.eslintrc.yml', 'utf8')).toEqual(
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
