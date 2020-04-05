# Sharec

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Flamartire%2Fsharec%2Fbadge&style=flat)](https://actions-badge.atrox.dev/lamartire/sharec/goto)
[![npm](https://img.shields.io/npm/v/sharec)](https://npmjs.com/sharec)
![MIT License](https://camo.githubusercontent.com/4481c7672053be9c676fbc983c040ca59fddfa19/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f6c6f6775782d70726f636573736f722e737667)

Sharec allows you install configuration via CLI with short and friendly commands.
Use it in your configuration packages.

## Supported configs

At this moment, sharec supports:

- `npmignore`
- `eslint`
- `eslintignore`
- `babel`
- `yaspeller`
- `browserslist`
- `postcss`
- `gitignore`
- `husky`
- `jest`
- `lint-staged`
- `stylelint`
- `commitlint`

Other `.json` or `.yaml` files will be merged by keys. Files with different extension will be
just copied.

## Options

**`--silent, -s`** - hides all outputs from `sharec` in CLI.

Example:

```json
{
  "scripts": {
    "postinstall": "sharec --silent"
  }
}
```

**`--overwrite, -o`** - force `sharec` to replace all configs without merging and caching.

Example:

```json
{
  "scripts": {
    "postinstall": "sharec --overwrite"
  }
}
```

**`--disappear, -d`** - installs configuration without meta injecting and caching, like
you do that by yourself.

Example:

```
{
  "scripts": {
    "postinstall": "sharec --disappear"
  }
}
```

## Ignoring configuration

If you want to force upcoming `sharec` configs – just add `ignore` flat to your projects's `sharec` field:

```json
{
  "sharec": {
    "ignore": true
  }
}
```

## Debugging

If you see some unexpected behavior and want to help with solution - you can provide
some debug information about with `DEBUG` environment variable. It allows to see
everything what happens inside of sharec flow.

```
{
  "scripts": {
    "postinstall": "DEBUG=true sharec"
  }
}
```

## Potential use-cases

You can use sharec not only for configuration management, you can also use it for:

- Create boilerplates, like `create-react-app`
- Deliver other files to your projects
