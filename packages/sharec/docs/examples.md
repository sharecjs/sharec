## Examples

You can see example [here](https://www.npmjs.com/package/sharec-demo-config) – install it or just look at sources.

So, you want to share your configuration files between projects.

### 1. Initialize new package

Create new directory and initialize it:

```
mkdir my-awesome-configs
cd my-awesome-configs
npm init -y
```

### 2. Install `sharec`

Install `sharec` in the created package:

```
npm i --save sharec
```

### 3. Add `sharec` to npm `postinstall` stript

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

### 4. Publish your configs package

Congrats, you are ready for starting configuration sharing. You can publish it
with `npm publish` or just push it to github.

### 5. Share it!

For example, you have published your `my-awesome-configs` into npm, now you ready
to install it.

Navigate to your existing or new project and run:

```
npm i --save-dev my-awesome-configs
```

Here we are! Configs were successfully installed 🙌
