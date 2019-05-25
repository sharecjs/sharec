# Sharec [![Build Status](https://travis-ci.org/lamartire/sharec.svg?branch=master)](https://travis-ci.org/lamartire/sharec) [![Build status](https://ci.appveyor.com/api/projects/status/mjtiauhp4xmvr9w7/branch/master?svg=true)](https://ci.appveyor.com/project/lamartire/sharec/branch/master)

> 📦 Store your configs in one place and share between projects without any pain

## Supported configs

`sharec` can merge, replace and copy configs.

Merge feature now available for `*.json` and `package.json` based configs. `*.js` based and other types of configs will be just replaced.

### Strategies

`sharec` using strategies for define config merging flow. There are following strategies:

- `eslint`
- `babel`

Other files will be merged by `common` strategy (shallow merging).

## Examples

- [examples.md](https://github.com/lamartire/sharec/blob/master/packages/sharec/docs/examples.md) – example notes about configuration preset creation, publishing and installing
- [sharec-demo-config](https://www.npmjs.com/package/sharec-demo-config) – official configuration preset example
- [essential-javascript-config](https://github.com/lamartire/essential-javascript-config) – my personal javascript-configuration preset
