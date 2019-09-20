# Sharec [![Build Status](https://travis-ci.org/lamartire/sharec.svg?branch=master)](https://travis-ci.org/lamartire/sharec) [![Build status](https://ci.appveyor.com/api/projects/status/mjtiauhp4xmvr9w7/branch/master?svg=true)](https://ci.appveyor.com/project/lamartire/sharec/branch/master) [![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Flamartire%2Fsharec%2Fbadge&style=flat)](https://actions-badge.atrox.dev/lamartire/sharec/goto)

Sharec allows you install configuration via CLI with short and friendly commands.
Use it in your configuration packages.

## Supported configs

Sharec can merge `.yaml` and `.json`. Other files manages with just copying or deleting.

Some tools have difficult and very specific configuration files (`eslint`, `babel` etc.),
and sharec provide strategies for this purposes.

For this moment, sharec provides strategies for following tools:

- `eslint`
- `babel`
- `yaspeller`

You can create your own strategy and open pull request, or request it in the project issues.

## Sharec-powered configuration lifecycle

Sharec uses a very simple and serial flow:

1. Check current configuration state
2. Removing old configuration
3. Installing new configuration

All changes, which you made in `.json` or `.yaml` files – will be saved.

**`.js` and other files would be fully rewrited**! Update it on the configuration-level!

## Configuration updating

If you want to update configuration in project to the definite version, just install
it, sharec will use the common flow.

## Commands

**`install`** - installs all configuration to the target project.

Example:

```json
{
  "scripts": {
    "postinstall": "sharec install"
  }
}
```

**`remove`** - removes installed configuration from target project. Modified fields will be saved.

**Highly recommend to avoid using that command in `preuninstall` and similar `npm` scripts**!

## Potential use-cases

You can use sharec not only for configuration management, you can also use it for:

- Create boilerplates, like `create-react-app`
- Deliver other files to your projects
