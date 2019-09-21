# Sharec demo config

[![Build Status](https://travis-ci.org/lamartire/sharec.svg?branch=master)](https://travis-ci.org/lamartire/sharec)
[![Build status](https://ci.appveyor.com/api/projects/status/mjtiauhp4xmvr9w7/branch/master?svg=true)](https://ci.appveyor.com/project/lamartire/sharec/branch/master)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Flamartire%2Fsharec%2Fbadge&style=flat)](https://actions-badge.atrox.dev/lamartire/sharec/goto)

## Manual

You should complete a few steps for configuration package creation:

**1. Create empty npm package and initialize `npm` in the last one:**

```shell
mkdir my-awesome-configs
cd my-awesome-configs
npm init -y
```

**2. Install `sharec` as dependency:**

```shell
npm add sharec
```

Install `sharec` as **dependency**, not as devDependecy, it is very important!

**3. Add `sharec` commands to npm scripts in initialized package, `scripts` section in your
`package.json` should looks like:**

```json
{
  "scripts": {
    "postinstall": "sharec install"
  }
}
```

**4. Create `configs` directory and store your files in:**

```shell
mkdir configs
```

Your configuration package should looks like:

```
└── my-awesome-configs/
    ├── configs/
    │   ├── .eslintrc
    │   ├── .babelrc
    │   ├── .editorconfig
    │   └── package.json
    └── package.json
```

`my-awesome-configs/configs/package.json` – should includes `dependencies` and `devDependencies`
which using by your configuration. For example, if you using `eslint` – it should contain `eslint`
as dependency. It would be injected in `package.json` of target project.

**5. Publish it and install.**

You have created your own configuration and ready to use it. Publish it or keep on github and then
install in target project.

Have a nice day and use sharec! 😉
