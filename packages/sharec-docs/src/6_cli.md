# CLI API

`sharec` ships only one command. Use it to apply all your configuration packages:

```shell
npx sharec
```

## Options

**`--cache, -c`** - disables or enables cache for configuration versioning. Also in can place all the `cahce` to `.sharec`
directory if you don't have `node_modules`. By default cache is enabled.

- `true` – cache will be saved inside `<project_path>/node_modules/.cache/sharec`
- `false` – cache won't be saved
- `include` – cache would be saved in `<project_path>/.sharec/cache`, instead `node_modules`

Examples:

```shell
npx sharec --cache
npx sharec --cache false
npx sharec --cache include
```
