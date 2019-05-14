# Sharec

[![Build Status](https://travis-ci.org/lamartire/sharec.svg?branch=master)](https://travis-ci.org/lamartire/sharec) [![Build status](https://ci.appveyor.com/api/projects/status/mjtiauhp4xmvr9w7/branch/master?svg=true)](https://ci.appveyor.com/project/lamartire/sharec/branch/master)

> 📦 Share your configs between projects without pain

## Installation

Install **sharec** into your configuration package with npm:

```
npm i --save-dev sharec
```

Or with yarn:

```
yarn add -D sharec
```

## Usage

If you want to share you configs – initialize new package and install `sharec`,
than you must create `configs` directory and move to it all your configuration
files with `package.json`. In `package.json` you can define required dependecies,
`sharec` will install them.

`sharec` implements similar flow:

1. Searching `configs`
2. Copying configuration files
3. Merging target project's `package.json` with `package.json` from configuration package
4. Install dependencies from configuration package's `package.json`

3 and 4 steps possibly only if you create `package.json` file in `configs` directory
of your configuration package.

## Examples

_You can see example [here](https://www.npmjs.com/package/sharec-demo-config) – install it or just look at sources._

So, you want to share your configuration files between projects.

### 1. Initialize new package

Create new directory and initialize it:

```
mkdir my-awesome-configs
cd my-awesome-configs
npm init -y
```

### 2. Install `sharec`

Install `sharec` in the created package:

```
npm i --save sharec
```

### 3. Add `sharec` to npm `postinstall` stript

You can easily inatall your config with `postinstall` script, just add following
line into your `package.json` `sciprts` section:

```
"postinstall": "sharec"
```

After this it should looks like:

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

### 4. Publish your configs package

Congrats, you are ready for starting configuration sharing. You can publish it
with `npm publish` or just push it to github.

### 5. Share it!

For example you have publish your `my-awesome-configs` into npm, now you ready
to install it.

Navigate to your existing or new project and makes:

```
npm i --save-dev my-awesome-configs
```

Here we are! Configs were successfully installed 🙌
