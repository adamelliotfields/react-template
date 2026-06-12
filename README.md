# react-template

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/adamelliotfields/react-template?machine=basicLinux32gb)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://pr.new/adamelliotfields/react-template)

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
npx degit adamelliotfields/react-template my-app
cd my-app

# start
npm install
npx vite
```

## Routing

Single pages apps require all routes to respond with `index.html`. That's the _single page_ part.

GitHub Pages doesn't do this for you, but they do support a custom `404.html` page. The [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique exploits this to redirect back to `index.html` for all routes.

In [`404.html`](./public/404.html), the `PATH_SEGMENTS` variable is set to `1`. This means if your app is hosted at `you.github.io/your-app`, the base path will be `/your-app`, which is what you want.

If this is your root `github.io` page or you're using a custom domain, set `PATH_SEGMENTS` to `0` so the base path will be `/`.

You also need to change `BASE_URL` in [`vite.config.ts`](./vite.config.ts) to match.

If you're not using GitHub Pages, you or your agent can remove this.

## Dark Mode

See [`theme.js`](./public/theme.js) and [`Theme.tsx`](./src/components/Theme.tsx) for the implementation.

## CI/CD

See [`build.yaml`](./.github/workflows/build.yaml). Build runs on all PRs; deploy runs on pushes or merges to `main`.
