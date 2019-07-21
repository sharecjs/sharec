# Sharec [![Build Status](https://travis-ci.org/lamartire/sharec.svg?branch=master)](https://travis-ci.org/lamartire/sharec) [![Build status](https://ci.appveyor.com/api/projects/status/mjtiauhp4xmvr9w7/branch/master?svg=true)](https://ci.appveyor.com/project/lamartire/sharec/branch/master)

<img src="public/logo.svg" align="right" alt="Sharec logo by Ivashkina Xenia" width="200">

Sharec – is a new minimalistic tool for boilerplating and configuration versioning,
which can copy, merge and delete files.

You can use that tool for share and management bloat configuration between different
projects, keep your code up to date and starts new projects in one command.

* **Integrity**. Pack all your configs in the one package and save time on support.
* **Distribution**. Publish configuration with npm or distribute it via repositories.
* **Simplicity**. Install packages just as dependency and forget about headache  related to configs.

## Usage

Check README in [sharec](packages/sharec) package or examine [official demo config](packages/sharec-demo-config)
with some clear installation manual.

## Example

With sharec you can transform this:

```diff
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "scripts": {
    "start": "NODE_ENV=development ./dev",
    "build": "rimraf dist && NODE_ENV=production ./build",
-   "eslint": "eslint ./src/**/*.js"
  },
- "husky": {
-   "hooks": {
-     "pre-commit": "lint-staged"
-   }
- },
- "lint-staged": {
-   "src/**/*.js": [
-     "eslint",
-     "prettier --write",
-     "git add"
-   ]
- },
- "browserslist": [
-   "last 2 version",
-   "> 1%"
- ],
- "babel": {
-   "presets": [
-     "@babel/preset-env"
-   ]
- },
- "prettier": {
-   "singleQuote": true,
-   "semi": false
- },
- "jest": {
-   "testURL": "http://localhost/",
-   "moduleNameMapper": {
-     "^src/(.*)$": "<rootDir>/src/$1"
-   }
- },
- "eslintConfig": {
-   "parser": "babel-eslint",
-   "env": {
-     "browser": true,
-     "es6": true,
-     "node": true,
-     "jest": true
-   },
-   "extends": "standard",
-   "rules": {
-     "space-before-function-paren": 0
-   },
-   "parserOptions": {
-     "ecmaVersion": 8,
-     "ecmaFeatures": {
-       "spread": true
-     },
-     "sourceType": "module"
-   }
- },
- "eslintIgnore": [
-   "/node_modules",
-   "/dist"
- ],
  "devDependencies": {
-   "@babel/core": "^7.0.1",
-   "@babel/preset-env": "^7.0.0",
-   "babel-core": "7.0.0-bridge.0",
-   "babel-eslint": "^10.0.0",
-   "babel-jest": "^23.6.0",
-   "eslint": "^5.6.0",
-   "eslint-config-standard": "^12.0.0",
-   "eslint-plugin-import": "^2.9.0",
-   "eslint-plugin-node": "^9.0.0",
-   "eslint-plugin-promise": "^4.0.1",
-   "eslint-plugin-standard": "^4.0.0",
-   "husky": "^2.0.0",
-   "lint-staged": "^8.0.4",
-   "prettier": "^1.11.1"
  }
}
```

To this:

```diff
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "scripts": {
    "start": "NODE_ENV=development ./dev",
    "build": "rimraf dist && NODE_ENV=production ./build",
  },
  "devDependencies": {
+    "my-awesome-config": "1.0.0"
  }
}
```

And forever forgot about configs-hell!
