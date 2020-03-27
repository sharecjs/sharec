# Sharec demo config

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Flamartire%2Fsharec%2Fbadge&style=flat)](https://actions-badge.atrox.dev/lamartire/sharec/goto)
[![npm](https://img.shields.io/npm/v/sharec-demo-config)](https://npmjs.com/sharec-demo-config)
![MIT License](https://camo.githubusercontent.com/4481c7672053be9c676fbc983c040ca59fddfa19/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f6c6f6775782d70726f636573736f722e737667)

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
