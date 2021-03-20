# Quick start

## 1. Initialize new package

```
mkdir my-awesome-configs
cd my-awesome-configs
npm init -y
```

## 2. Install `sharec`

```
npm i --save sharec
```

## 3. Add `sharec` to npm `postinstall` script

You can easily install your config with `postinstall` script, just add the following
line into your `package.json` `scripts` section:

```
"postinstall": "sharec"
```

After that it should look like this:

```json
{
  "name": "my-awesome-configs",
  "scripts": {
    "postinstall": "sharec"
  },
  "dependencies": {
    "sharec": "1.0.0"
  }
}
```

## 4. Publish your configs package

Congratulations, you are ready to share your configuration. You can publish it
with `npm publish` or just push it to github.

## 5. Share it!

Install your previously published configuration package:

```
npm i --save-dev my-awesome-configs
```

Configs were successfully installed 🙌
