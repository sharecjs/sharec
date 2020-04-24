jest.mock('utils/std', () => {
  const stdUtils = require.requireActual('../src/utils/std')
  const fs = require('memfs').promises

  stdUtils.fs = {
    readDir: fs.readdir,
    makeDir: fs.mkdir,
    readFile: fs.readFile,
    copyFile: fs.copyFile,
    writeFile: fs.writeFile,
    lstat: fs.lstat,
    removeFile: fs.unlink,
  }

  return stdUtils
})

jest.mock('shelljs', () => ({
  pwd: jest.fn(),
}))
