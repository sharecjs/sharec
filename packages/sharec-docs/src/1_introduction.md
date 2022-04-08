# Introduction

With **sharec** you can share and manage configuration across projects,
keep your code up to date and prepare new ones in one command.

## Potential use-cases

- Versionable configuration packages
- Boilerplates and project starters (like `create-react-app`)

## Supported configs

At this moment, sharec supports:

- `npmignore`
- `eslint`
- `eslintignore`
- `babel`
- `yaspeller`
- `browserslist`
- `postcss`
- `gitignore`
- `husky`
- `jest` (only as `package.json` member)
- `lint-staged`
- `stylelint`
- `commitlint`
- `prettier`

Other `.json` or `.yaml` files will be merged by keys.

Files with different extension will be just copied.

## `.gitignore` and `.npmignore`

If you want to include these files, you should name them without dot -
`gitignore`, `npmignore`. It's necessary because originally named
files won't be readed during installation.
