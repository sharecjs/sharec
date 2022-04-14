---
title: Runtime configuration
permalink: '/docs/runtime_configuration/'
---

# Runtime configuration

With runtime configuration you can add `hooks` to customize any field in
`FlowContext`.

Hook should match following signature:

```ts
type FlowStep = (context: FlowContext) => Promise<FlowContext>
```

At this moment `sharec` supports two hooks: `beforeMerge` and `afterMerge`.

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

You can write your own hook, publish it and re-use everywhere you need.
