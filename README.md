# april-bill
An SPA app for personal bookkeeping purpose, static front-end page with serverless service from Firebase.

# base url

in `vite.config.js` file

```js
export default defineConfig({
  plugins: [vue()],
  base: "/april-bill/"//delete it if you want it in root path
})
```

# dev server

```
npm run dev
```

# generate static site

```
npm run build
```

static site files are generated under `\dist` folder.

# preview static site

```
npm run serve
```