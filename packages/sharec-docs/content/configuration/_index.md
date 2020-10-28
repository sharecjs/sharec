---
type: 'page'
title: 'Sharec - Configuration'
---

# Configuration

Sharec provides optional runtime configuration for your packages. For example
you can overwrite specific files without merge.

## Configuration file

Configuration file should be placed in the root of your configuration package.
It can be defined in `.sharecrc.json` file, or in `sharec` filed in `package.json`.

Your project's stucture should looks like:

```text
my-awesome-configs/
  ├── configs/
  │  └── ...
  ├── package.json
  └── .sharecrc.json
```

## Reference

`configs` – configuration files options

---

`configs[name: string].overwrite: boolean` – forcily rewrite file without
merge and caching.

Example:

```json
{
  "configs": {
    ".eslintrc": {
      "overwrite": true
    }
  }
}
```

`.eslintrc` will be always equal to upcoming one.

---

`configs[name: string].format: boolean` – enables or disables formatting with
`prettier` or `editorconfig`.

Example:

```json
{
  "configs": {
    ".eslintrc": {
      "format": false
    }
  }
}
```

`.eslintrc` will not be formatted.
