# How it works

Here you can read some details about `sharec` architecture.

## The Core

`sharec` actively uses middleware pattern dividing all the core logic to
simple steps. All the steps can be divided on three groups: `read`, `process`
and `write`.

From step to step we're passing `FlowContext` – structure which includes all
the data we need: target package data, loaded configs, cache, processing result;
and `Semaphore` – abstraction controlling the whole process:

```text
(context, semaphore) -> readTargetPackage -> ... -> mergeConfigsPackages -> ... -> writeConfigs -> ...
```

`FlowContext` is very similary to `Request` and `Response` parameters in
`express` or `koa` middlewares.

With `Semaphore` steps can send any data to CLI or even terminate the process.

## Schema definiton

`sharec` allows to describe `json` and `yaml` based configurations declaratively
providing special utilities in `sharec-schema` package.

Each field can be processed by helper depending on it's type.

Composed schema is a just function, which can process given data structure in a
specific way:

```js
const { compose } = require('sharec-schema').actions
const { primitiveAtom } = require('sharec-schema').atoms

const schema = compose({
  field: primitiveAtom,
})
```

Schema has special operators: `$$default` to handle fields, which weren't
described and `$$ignore` to exclude fields from the process:

```js
const { compose } = require('sharec-schema').actions
const { primitiveAtom, hashAtom } = require('sharec-schema').atoms

const schema = compose({
  field: hashAtom,
  $$default: primitiveAtom,
  $$ignore: ['foo', 'bar', 'baz'],
})
```

Fields that have multiple possible types, can be handled by `fork` operator.
It allows to match field with predicate and apply required function:

```js
const isMap = require('lodash/isMap')
const { compose, fork } = require('sharec-schema').actions
const { hashAtom, listConcatAtom, primitiveAtom } = require('sharec-schema').atoms

const defaultJson = compose({
  $$default: fork([[Array.isArray, listConcatAtom], [isMap, hashAtom], primitiveAtom]),
})
```

To apply required schema it should be mapped by certain file name or regexp:

```js
const { map } = require('sharec-schema').actions
const { createJsonPipe } = require('sharec-schema').pipes
const { babelJson } = require('./schema')

const babelJsonPipe = createJsonPipe([babelJson])

const babelPipe = map(['.babelrc', babelJsonPipe], ['.babelrc.json', babelJsonPipe], ['babelrc.json', babelJsonPipe])
```
