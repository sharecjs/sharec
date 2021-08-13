jest.mock('sharec-utils/lib/std', () => {
  const fs = require('memfs')
  const { promisify } = require('util')

  return {
    readdir: fs.promises.readdir,
    makedir: fs.promises.mkdir,
    readFile: fs.promises.readFile,
    copyFile: fs.promises.copyFile,
    writeFile: fs.promises.writeFile,
    lstat: fs.promises.lstat,
    removeFile: fs.promises.unlink,
    open: promisify(fs.open),
    close: promisify(fs.close),
    read: promisify(fs.read),
  }
})

jest.mock('shelljs', () => ({
  pwd: jest.fn(),
}))
