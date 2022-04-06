/// <reference types="node" />
import nativeFS = require('fs')
export const readdir: typeof nativeFS.readdir.__promisify__
export const makedir: typeof nativeFS.mkdir.__promisify__
export const readFile: typeof nativeFS.readFile.__promisify__
export const copyFile: typeof nativeFS.copyFile.__promisify__
export const writeFile: typeof nativeFS.writeFile.__promisify__
export const lstat: typeof nativeFS.lstat.__promisify__
export const removeFile: typeof nativeFS.unlink.__promisify__
export const stat: typeof nativeFS.stat.__promisify__
