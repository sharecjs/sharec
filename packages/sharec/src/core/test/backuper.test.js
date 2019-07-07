const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { vol } = require('memfs')
const {
  createBackup,
  writeBackup,
  readBackup,
  backupConfigs,
} = require('core/backuper')

describe('core > backuper >', () => {
  const lock01 = require('fixtures/lock/lockFile_01.json')
  const packageJson01 = require('fixtures/package/package_01.json')
  const eslint01 = readFileSync(
    path.join(__dirname, '../../../test/fixtures/eslint/yaml/eslintrc_01.yml'),
  )

  beforeEach(() => {
    vol.reset()
  })

  describe('createBackup', () => {
    it('should create backup of given config files in given directory', async () => {
      expect.assertions(1)

      const dir = {
        'package.json': JSON.stringify(packageJson01, null, 2),
        '.eslintrc.yml': eslint01.toString(),
      }
      vol.fromJSON(dir, '/')

      const backup = await createBackup({
        targetPath: '/',
        configs: Object.keys(dir),
      })

      expect(backup).toMatchSnapshot()
    })
  })

  describe('writeBackup', () => {
    it('should write given backup to the target dir', async () => {
      expect.assertions(1)

      const backup = {
        foo: 'bar',
      }
      vol.fromJSON({}, '/')

      await writeBackup({
        targetPath: '/',
        backup,
      })

      expect(JSON.parse(vol.readFileSync('/sharec-lock.json'))).toEqual(backup)
    })
  })

  describe('readBackup', () => {
    it('should read backup from given directory and restore all files', async () => {
      expect.assertions(1)

      const dir = {
        'sharec-lock.json': JSON.stringify(lock01, null, 2),
      }
      vol.fromJSON(dir, '/')

      const res = await readBackup('/')

      expect(res).toEqual({
        files: {
          'package.json': JSON.stringify(packageJson01, null, 2),
          '.eslintrc.yml': eslint01.toString(),
        },
      })
    })

    it('should return null if backup is not exist', async () => {
      expect.assertions(1)

      const dir = {}
      vol.fromJSON(dir, '/')

      const res = await readBackup({
        targetPath: '/',
      })

      expect(res).toBeNull()
    })
  })

  describe('backupConfigs', () => {
    it('should create configs backup from target path', async () => {
      const dir = {
        'package.json': JSON.stringify(packageJson01, null, 2),
        '.eslintrc.yml': eslint01.toString(),
      }
      vol.fromJSON(dir, '/')

      await backupConfigs({
        targetPath: '/',
        configs: Object.keys(dir),
      })
      expect(
        JSON.parse(vol.readFileSync('/sharec-lock.json')),
      ).toMatchSnapshot()
    })

    it('should not create configs backup if configs are not exists', async done => {
      expect.assertions(1)

      const dir = {}
      vol.fromJSON(dir, '/')

      await backupConfigs({
        targetPath: '/',
        configs: ['.eslintrc'],
      })

      try {
        vol.readFileSync('/sharec-lock.json', 'utf8')
      } catch (err) {
        expect(err.message).toContain('ENOENT')
        done()
      }
    })
  })
})
