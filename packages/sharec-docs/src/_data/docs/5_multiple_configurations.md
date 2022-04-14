---
title: Multiple configurations
permalink: '/docs/multi_configs/'
---

# Multiple configurations

`sharec` supports multiple configuration package.

You just need to install packages you need and pass them to `sharec.configs`
field in your `package.json` file:

```json
{
  "name": "my-awesome-project",
  "devDependencies": {
    "config-a": "0.0.1",
    "config-b": "0.1.0",
    "config-c": "1.0.0",
    "sharec": "3.0.0"
  },
  "sharec": {
    "configs": ["config-a", "config-b", "config-c"]
  }
}
```

## How configs will be applyed

Your configs will be merged in order you described in `sharec.configs`.

Keep in mind, that next config can overwrite previous one.

## Use cases

You can divide your configs by purporse: `javascript`, `css`, `git`,
`utilities`, etc. And then combine them between each other to make them
lighter and much more maintainable.
