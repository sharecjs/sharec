const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const sharec = require('../../')

describe('sharec > install', () => {
  const packageInstallJsonBaseFxt = fixtures(
    'package/json/03-base-install',
    'json',
  )
  const babelBaseFxt = fixtures('babel/json/01-base', 'json')
  const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')
  const eslintBaseFxtYaml = fixtures('eslint/yaml/01-base')
  const targetProcess = {
    argv: [null, null, 'install'],
    env: {
      PWD: '/configuration-package',
      INIT_CWD: '/target',
    },
  }

  beforeEach(() => {
    vol.reset()
  })

  it('should install configs to the target project', async () => {
    expect.assertions(5)

    const dir = {
      '/target/.eslintrc': JSON.stringify(eslintBaseFxt.current),
      '/target/babelrc.json': JSON.stringify(babelBaseFxt.current),
      '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
      '/target/package.json': JSON.stringify(packageInstallJsonBaseFxt.current),
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

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toEqual('bar')
    expect(
      JSON.parse(vol.readFileSync('/target/babelrc.json', 'utf8')),
    ).toEqual(babelBaseFxt.result)
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintBaseFxt.result,
    )
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toWraplessEqual(
      eslintBaseFxtYaml.result,
    )
    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual({
      ...packageInstallJsonBaseFxt.result,
      sharec: {
        config: 'awesome-config',
        version: '1.0.0',
      },
    })
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

    await sharec(targetProcess)

    expect(vol.readdirSync('/target')).not.toContain('.editorconfig')
    expect(
      JSON.parse(vol.readFileSync('/target/babelrc.json', 'utf8')),
    ).toEqual(babelBaseFxt.current)
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintBaseFxt.current,
    )
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toWraplessEqual(
      eslintBaseFxtYaml.current,
    )
    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual({
      ...packageInstallJsonBaseFxt.current,
      dependencies: {
        sharec: '1.0.0',
      },
    })
  })

  it('should not install any configs if target has sharec ignore flag', async () => {
    expect.assertions(5)

    const dir = {
      '/target/.eslintrc': JSON.stringify(eslintBaseFxt.current),
      '/target/babelrc.json': JSON.stringify(babelBaseFxt.current),
      '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
      '/target/package.json': JSON.stringify({
        ...packageInstallJsonBaseFxt.current,
        sharec: {
          ignore: true,
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

    await sharec(targetProcess)

    expect(vol.readdirSync('/target')).not.toContain('.editorconfig')
    expect(
      JSON.parse(vol.readFileSync('/target/babelrc.json', 'utf8')),
    ).toEqual(babelBaseFxt.current)
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintBaseFxt.current,
    )
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toWraplessEqual(
      eslintBaseFxtYaml.current,
    )
    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual({
      ...packageInstallJsonBaseFxt.current,
      sharec: {
        ignore: true,
      },
    })
  })

  it('should support old meta data format', async () => {
    const packageOldMetaJsonBaseFxt = fixtures(
      'package/json/12-old-meta',
      'json',
    )

    const dir = {
      '/target/package.json': JSON.stringify(packageOldMetaJsonBaseFxt.current),
      '/configuration-package/configs/.gitkeep': '',
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageOldMetaJsonBaseFxt.result)
  })
})
