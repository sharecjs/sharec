# Sharec [![Build Status](https://travis-ci.org/lamartire/sharec.svg?branch=master)](https://travis-ci.org/lamartire/sharec) [![Build status](https://ci.appveyor.com/api/projects/status/mjtiauhp4xmvr9w7/branch/master?svg=true)](https://ci.appveyor.com/project/lamartire/sharec/branch/master)

> 📦 Store your configs in one place and share between projects without any pain

# Sharec – the secret weapon against "bloat" configs

Minify and support your big configs with extraction to external package with `share`.

Just move all configuration (include file) to another package, install `sharec` and distribute it through projects!

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

Before config extraction your `package.json` will be look like this:

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

Run `npm i --save-dev my-awesome-config` and solve once and for all "bloat" configs problem!

With `sharec` you also allowed to easily create boilerplates: both big public (like `create-react-app` or `vue-cli`) and inner small starters and bootstraps.

## Links

See [sharec](https://github.com/lamartire/sharec/tree/master/packages/sharec)
package or [official demo config](https://github.com/lamartire/sharec/tree/master/packages/sharec-demo-config).
