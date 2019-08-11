const { fixture } = require('testUtils')
const { vol } = require('memfs')
const remove = require('../../remove')

describe('commands > remove >', () => {
  const packageJsonResult = fixture(
    'package/04-base-remove/result.json',
    'json',
  )
  const packageJsonNew = fixture('package/04-base-remove/new.json', 'json')
  const packageJsonRestored = fixture(
    'package/04-base-remove/restored.json',
    'json',
  )
  const babelResult = fixture('babel/json/04-listed-values/result.json', 'json')
  const babelNew = fixture('babel/json/04-listed-values/new.json', 'json')
  const babelRestored = fixture(
    'babel/json/04-listed-values/restored.json',
    'json',
  )

  const eslintResult = fixture(
    'eslint/json/02-parser-options-operations/result.json',
    'json',
  )
  const eslintNew = fixture(
    'eslint/json/02-parser-options-operations/new.json',
    'json',
  )
  const eslintRestored = fixture(
    'eslint/json/02-parser-options-operations/restored.json',
    'json',
  )

  const yamlEslintResult = fixture(
    'eslint/yaml/02-parser-options-operations/result.yml',
  )
  const yamlEslintNew = fixture(
    'eslint/yaml/02-parser-options-operations/new.yml',
  )
  const yamlEslintRestored = fixture(
    'eslint/yaml/02-parser-options-operations/restored.yml',
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
      '/target/.eslintrc': JSON.stringify(eslintResult),
      '/target/.babelrc': JSON.stringify(babelResult),
      '/configuration-package/configs/.eslintrc': JSON.stringify(eslintNew),
      '/configuration-package/configs/.babelrc': JSON.stringify(babelResult),
    }

    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(JSON.parse(vol.readFileSync('/target/package.json'))).toEqual({})
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintRestored,
    )
    expect(vol.readdirSync('/target')).not.toContain('.babelrc')
  })

  it('should remove configuration from package.json', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify(packageJsonResult),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonNew,
      ),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(JSON.parse(vol.readFileSync('/target/package.json'))).toEqual(
      packageJsonRestored,
    )
  })

  it('should remove configuration from package.json and other matched files', async () => {
    expect.assertions(4)

    const dir = {
      '/target/package.json': JSON.stringify(packageJsonResult),
      '/target/.eslintrc.yml': yamlEslintResult,
      '/target/.babelrc': JSON.stringify(babelResult),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonNew,
      ),
      '/configuration-package/package-lock.json': 'foo',
      '/configuration-package/configs/.eslintrc.yml': yamlEslintNew,
      '/configuration-package/configs/.babelrc': JSON.stringify(babelNew),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(vol.readFileSync('/target/.eslintrc.yml', 'utf8')).toEqual(
      yamlEslintRestored,
    )
    expect(JSON.parse(vol.readFileSync('/target/.babelrc'))).toEqual(
      babelRestored,
    )
    expect(JSON.parse(vol.readFileSync('/target/package.json'))).toEqual(
      packageJsonRestored,
    )
    expect(vol.readdirSync('/target')).not.toContain('package-lock.json')
  })
})
