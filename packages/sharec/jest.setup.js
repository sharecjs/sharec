jest.mock('sharec-utils/lib/std', () => {
  const stdUtils = jest.requireActual('sharec-utils/lib/std')
  const fs = require('memfs').promises

  stdUtils.fs = {
    readdir: fs.readdir,
    makedir: fs.mkdir,
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
