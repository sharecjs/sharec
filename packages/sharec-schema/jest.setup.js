jest.mock('sharec-utils', () => {
  const utils = require.requireActual('sharec-utils')
  const fs = require('memfs').promises

  utils.std.fs = {
    readDir: fs.readdir,
    makeDir: fs.mkdir,
    readFile: fs.readFile,
    copyFile: fs.copyFile,
    writeFile: fs.writeFile,
    lstat: fs.lstat,
    removeFile: fs.unlink,
  }

  return utils
})
