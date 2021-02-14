const sharecUtils = require('sharec-utils')

jest.doMock('sharec-utils', () => {
  const fs = require('memfs').promises

  return {
    ...sharecUtils,
    std: {
      ...sharecUtils.std,
      fs: {
        readDir: fs.readdir,
        makeDir: fs.mkdir,
        readFile: fs.readFile,
        copyFile: fs.copyFile,
        writeFile: fs.writeFile,
        lstat: fs.lstat,
        removeFile: fs.unlink,
      },
    },
  }
})
