# react-template

A template for React single page apps.

## Features

- [**Tailwind**](https://github.com/tailwindlabs/tailwindcss)
- [**shadcn**](https://github.com/shadcn-ui/ui)
- [**Wouter**](https://github.com/molefrog/wouter)
- [**Vitest**](https://github.com/vitest-dev/vitest)
- [**Biome**](https://github.com/biomejs/biome)

## Usage

```sh
# clone
npx degit 0xfieldsy/react-template my-app
cd my-app

# start
npm install
npx vite
```

## Routing

Single pages apps require all routes to respond with `index.html`. That's the _single page_ part.

GitHub Pages doesn't do this for you, but they do support a custom `404.html` page. The [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique exploits this to redirect back to `index.html` for all routes.

Set `BASE_PATH` in both [`404.html`](./public/404.html) and [`vite.config.ts`](./vite.config.ts) to the pathname where the app is deployed. For example, use `/react-template` when deploying this template to `you.github.io/react-template`.

If this is your root `github.io` page or you're using a custom domain, set `BASE_PATH` to `/` in both files.

If you're not using GitHub Pages, you can remove this.

## Dark Mode

See [`theme.js`](./public/theme.js) and [`Theme.tsx`](./src/components/Theme.tsx) for the implementation.

## CI/CD

See [`build.yaml`](./.github/workflows/build.yaml). Build runs on all PRs; deploy runs on pushes or merges to `main`.
