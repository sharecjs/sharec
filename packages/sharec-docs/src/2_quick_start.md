# Quick start

## Pack your configs

1. Init new npm package
2. Create `configs` directory inside
3. Place some configuration files to the directory
4. Create `package.json` file inside `configs` directory and add dependencies
   your tools need
5. Publish the package

## Prepare your project

1. Install your recently published configuration package
2. Install `sharec` to your project
3. Modify `package.json` in the project with `sharec` field:

```diff
{
  "name": "my-awesome-project",
  "devDependencies": {
    "my-awesome-config": "1.0.0",
    "sharec": "3.0.0"
  },
+  "sharec": {
+    "configs": ["my-awesome-config"]
+  }
}
```

4. Run `sharec` command manually:

```shell
npx sharec
```

Or add `postinstall` hook:

```diff
{
  "name": "my-awesome-project",
+  "scripts": {
+    "postinstall": "sharec"
+  },
  "devDependencies": {
    "my-awesome-config": "1.0.0",
    "sharec": "3.0.0"
  },
  "sharec": {
    "configs": ["my-awesome-config"]
  }
}
```

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
+    "sharec": "3.0.0",
+    "my-awesome-config": "1.0.0"
  },
+  "sharec": {
+    "configs": ["my-awesome-config"]
+  }
}
```
