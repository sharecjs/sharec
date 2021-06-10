/// <reference types="node" />
import { mkdir } from 'fs'
import { unlink } from 'fs'
export namespace fs {
  const readdir: typeof import('fs').readdir.__promisify__
  const makedir: typeof mkdir.__promisify__
  const readFile: typeof import('fs').readFile.__promisify__
  const copyFile: typeof import('fs').copyFile.__promisify__
  const writeFile: typeof import('fs').writeFile.__promisify__
  const lstat: typeof import('fs').lstat.__promisify__
  const removeFile: typeof unlink.__promisify__
}
export namespace path {
  function join(p: string, ...parts: string[]): string
  function resolve(p: string, ...parts: string[]): string
  function basename(p: string, ext?: string): string
  function dirname(p: string): string
}
