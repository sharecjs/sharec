# Sharec

[![.github/workflows/main.yml](https://github.com/lamartire/sharec/workflows/.github/workflows/main.yml/badge.svg)](https://github.com/lamartire/sharec/actions)
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
- `prettier`

Other `.json` or `.yaml` files will be merged by keys.

Files with different extension will be just copied.

## Potential use-cases

- Versionable configuration packages (try out [demo config](https://github.com/lamartire/sharec/tree/master/packages/sharec-demo-config))
- Create boilerplates, like `create-react-app` (see dead simple example [here](https://github.com/lamartire/sharec-react-app))

## `.gitignore` and `.npmignore`

If you want to include these files, you should name them without dot - `gitignore`, `npmignore`.
It needs, because originally named files would not be readed during installation.

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

**`--interactive, -i`** - interactive mode in which `sharec` asks user before merge any config.

Example:

```
{
  "scripts": {
    "postinstall": "sharec --interactive"
  }
}
```

**`--include-cache, -c`** - saves configuration cache in target project directory. It is very usefull,
if you want always have ability to change configuration version in project without any problems.

With this option, cache would be saved in `<project_path>/.sharec/.cache`, instead `node_modules`.

Especially this feature can be usefull if you are using package manager which do not make `node_modules`.

Be sure, if you use this option, that `.sharec` directory is not ignored by git!

Example:

```
{
  "scripts": {
    "postinstall": "sharec --include-cache"
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
