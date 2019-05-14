# Sharec

> 📦 Store your configs in one place and share between projects without any pain

## Introduction

`sharec` – is a new tool for sharing bloat and difficult configuration between many projects.

With this tool you can place all your configuration files in single repository and install it with `npm` or other package manager. That will make configuration process pretty simple.

## Installation

You should create new package and install `sharec` into as dependency.

```shell
npm i --save sharec # With npm
yarn add sharec     # Or with yarn
```

Next step – add `sharec` to `postinstall` hook of your configs:

```json
{
  "name": "my-awesome-configs",
  "scripts": {
    "postinstall": "sharec"
  },
  "dependencies": {
    "sharec": "1.0.0"
  }
}
```

All done! You are ready to create configs.

## Configuration creating

After installing you must create `configs` directory and init `npm` here.

```shell
mkdir configs
cd ./configs
npm init -y
```

Now, you allowed to create sharable configs! [Check this simple example](https://www.npmjs.com/package/sharec-demo-config).

## Configuration installation

When you will be ready to share – push your configs or publish at npm-registry. After publishing/pushin you can install new configuration to any project.

```shell
npm i --save-dev my-awesome-configs
```

When configuration will be installed you can see a new entry in the project's `package.json` file:

```json
"sharec": {
  "injected": true
}
```

It means – configs were injected and on the next `npm install` – `sharec` will not inject configurations again.

## Examples

- [examples.md](https://github.com/lamartire/sharec/blob/master/packages/sharec/docs/examples.md) – example notes about configuration preset creation, publishing and installing
- [sharec-demo-config](https://www.npmjs.com/package/sharec-demo-config) – official configuration preset example
- [essential-javascript-config](https://github.com/lamartire/essential-javascript-config) – my personal javascript-configuration preset
