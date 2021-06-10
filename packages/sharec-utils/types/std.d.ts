/// <reference types="node" />
declare const readDir: typeof fs.readdir.__promisify__
declare const makeDir: typeof fs.mkdir.__promisify__
declare const readFile: typeof fs.readFile.__promisify__
declare const copyFile: typeof fs.copyFile.__promisify__
declare const writeFile: typeof fs.writeFile.__promisify__
declare const lstat: typeof fs.lstat.__promisify__
declare const removeFile: typeof fs.unlink.__promisify__
import fs_1 = require('fs')
export namespace fs {
  export { readDir }
  export { makeDir }
  export { readFile }
  export { copyFile }
  export { writeFile }
  export { lstat }
  export { removeFile }
}
export namespace path {
  function join(p: string, ...parts: string[]): string
  function resolve(p: string, ...parts: string[]): string
  function basename(p: string, ext?: string): string
  function dirname(p: string): string
}
export {}
