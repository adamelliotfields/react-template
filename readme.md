# react-template

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/adamelliotfields/react-template?devcontainer_path=.devcontainer/devcontainer.json&machine=basicLinux32gb)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://pr.new/adamelliotfields/react-template)

My template for React apps hosted on GitHub Pages.

## Features

- [**Bun**](https://github.com/oven-sh/bun), [**Vite**](https://github.com/vitejs/vite), and [**SWC**](https://github.com/vitejs/vite-plugin-react-swc).
- [**Jotai**](https://github.com/pmndrs/jotai) for React state.
- [**Tailwind**](https://github.com/tailwindlabs/tailwindcss) for [shadcn-ui](https://github.com/shadcn-ui/ui) components.
- [**Motion**](https://github.com/framer/motion) for [Magic UI](https://github.com/magicuidesign/magicui) animations.
- [**Biome**](https://github.com/biomejs/biome) for linting and formatting.

## Usage

```sh
# bun
export PATH="${HOME}/.bun/bin:${PATH}"
curl -fsSL https://bun.sh/install | bash

# clone
bunx degit adamelliotfields/react-template my-app
cd my-app

# start
bun install
bun start
```

## Configuration

Use [`.env`](./.env) for settings like title and description; use `.env.local` for secrets.

## Routing

Single pages apps require all routes to respond with `index.html`. That's the _single page_ part.

GitHub Pages doesn't do this for you, but they do support a custom `404.html` page. The [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique exploits this to redirect back to `index.html` for all routes.

In [`404.html`](./public/404.html), the `PATH_SEGMENTS` variable is set to `1`. This means if your app is hosted at `you.github.io/your-app`, the base path will be `/your-app`, which is what you want.

If this is your root `github.io` page or you're using a custom domain, set `PATH_SEGMENTS` to `0` so the base path will be `/`.

## Dark Mode

See [`theme.js`](./public/theme.js) and [`Theme.tsx`](./src/components/Theme.tsx) for the implementation and [`Header.tsx`](./src/components/Header.tsx) for usage.

## CI/CD

See [`build.yml`](./.github/workflows/build.yml). Build runs on all PRs; deploy runs on pushes or merges to `main`.

## SEO

To generate [`og.png`](./public/og.png), use Vercel's [OG Playground](https://og-playground.vercel.app):
  1. Set **Size** to `1.9:1`
  2. Set **Emoji Provider** to `Noto`
  3. Paste this template:

```html
<div tw="p-12 h-full w-full flex bg-neutral-50">
  <div tw="p-6 w-full flex flex-col justify-end border-8 border-neutral-900">
    <h2 tw="mb-0 flex flex-col text-neutral-900">
      <span tw="-ml-2 text-8xl">⚛️</span>
      <span tw="mt-6 text-6xl">React Template</span>
    </h2>
    <p tw="text-4xl">A starter kit for single page apps</p>
  </div>
</div>
```
