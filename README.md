# Sharec

<img src="https://raw.githubusercontent.com/lamartire/sharec/d91504a64409b3f3db531a7bca749295a3b20d92/packages/sharec-docs/static/images/logo-alt.svg" alt="Sharec logo by Ivashkina Xenia <xeniaowl112@mail.ru>" align="right" width="100">

[![.github/workflows/main.yml](https://github.com/lamartire/sharec/workflows/.github/workflows/main.yml/badge.svg)](https://github.com/lamartire/sharec/actions)
[![npm](https://img.shields.io/npm/v/sharec)](https://npmjs.com/sharec)
![MIT License](https://camo.githubusercontent.com/4481c7672053be9c676fbc983c040ca59fddfa19/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f6c6f6775782d70726f636573736f722e737667)

With **sharec** you can share and manage configuration across projects,
keep your code up to date and start new projects in one command.

Just transform this:

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

Continue reading on [sharec.js.org](https://sharec.js.org/)
