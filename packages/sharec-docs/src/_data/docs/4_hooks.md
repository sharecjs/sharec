---
title: Hooks
permalink: '/docs/hooks/'
---

# Hooks

You can define your hooks in the runtime configuration finle. With hooks you can
customize any field in `FlowContext`.

Hook should match following signature:

```ts
type FlowStep = (context: FlowContext) => Promise<FlowContext>
```

At this moment `sharec` supports two hooks: `beforeMerge` and `afterMerge`.

## Using hooks

You can install and use any external hook:

```js
const prettierHook = require('sharec-prettier-hook')

module.exports = {
  afterMerge: prettierHook,
}
```

## Writting your own hook

Hooks authoring is very simple:

```js
// .sharecrc.js
const { EOL } = require('os')

module.exports = {
  // here we're logging whole the context before `mergeConfigsPackages` step
  beforeMerge: async (context) => {
    console.log('Before merge hooks has been fired: ', context)
    return context
  },
  // in this step we're removing EOL from the all files
  afterMerge: async (context) => {
    const eolRe = new RegExp(`${EOL}$`)

    for (const config in context.mergedConfigs) {
      if (!eolRe.test(context.mergedConfigs[config])) continue

      context.mergedConfigs[config] = context.mergedConfigs[config].replace(eolRe, '')
    }

    return context
  },
}
```

## Official hooks

- [`sharec-editorconfig-hook`](https://github.com/sharecjs/sharec-editorconfig-hook) – applies formatting from `.editorconfig`
- [`sharec-prettier-hook`](https://github.com/sharecjs/sharec-prettier-hook) – applies `prettier` formatting
