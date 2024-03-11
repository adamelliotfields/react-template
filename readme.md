# react-template

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/adamelliotfields/react-template?devcontainer_path=.devcontainer/devcontainer.json&machine=basicLinux32gb)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://pr.new/adamelliotfields/react-template)

My personal template for React apps. Built for speed ⚡

## Features

- [**Bun**](https://github.com/oven-sh/bun) for dependencies and tests.
- [**Vite**](https://github.com/vitejs/vite) for builds.
- [**SWC**](https://github.com/vitejs/vite-plugin-react-swc) for hot reloading.
- [**Biome**](https://github.com/biomejs/biome) for linting and formatting.
- [**Demo**](https://aef.me/react-template) with _TypeScript_, _Tailwind_, _Lucide_, _Jotai_, and _Wouter_.

## Usage

See [`package.json`](./package.json).

```sh
# bun
export PATH="${HOME}/.bun/bin:${PATH}"
curl -fsSL https://bun.sh/install | bash

# clone
bunx degit adamelliotfields/react-template my-app
cd my-app

# install
bun i

# start
bun start
```

## Configuration

Use [`.env`](./.env) for settings like title and description; use `.env.local` for secrets (Git ignored).

The `VITE_HOMEPAGE` variable is used to determine the base path, similar to how [`homepage`](https://create-react-app.dev/docs/deployment/#github-pages) works in `create-react-app`.

### GitHub Pages SPA

I'm using the [`spa-github-pages`](https://github.com/rafgraph/spa-github-pages) technique to support client-side routing.

In [`404.html`](./public/404.html), `PATH_SEGMENTS` is set to `1` to keep the base path. This means if your app is hosted at `you.github.io/your-app`, the base path will be `/your-app`, which is what you want.

If this is your root `github.io` page or you're using a custom domain, set `PATH_SEGMENTS` to `0`.

For the actual routing, I use [`wouter`](https://github.com/molefrog/wouter).

## Deployment

Build runs on all PRs; deploy runs on pushes or merges to `main`. See [`build.yml`](./.github/workflows/build.yml).

## Utilities

See [`clamp`](./src/lib/clamp.ts), [`debounce`](./src/lib/debounce.ts), [`formatDate`](./src/lib/format-date.ts), [`random`](./src/lib/random.ts), [`range`](./src/lib/range.ts), [`sleep`](./src/lib/sleep.ts), [`throttle`](./src/lib/throttle.ts), and [`uid`](./src/lib/uid.ts).

## Dark Mode

A minified [`theme.js`](./public/theme.js) is in [`index.html`](./index.html). This script checks for a `dark` key in local storage with the following logic:
  1. If `true`, then `data-theme` is set to `dark`.
  2. If `false`, then `data-theme` is set to `light`.
  3. If not defined, then `data-theme` is set to `system`.

A mutation observer watches for changes to the `data-theme` attribute, and an event handler listens for `prefers-color-scheme` changes. Before the theme is updated, all transitions are temporarily disabled so the update is instant.

In your app, you just need to put this somewhere:

```tsx
const themes = ['dark', 'light', 'system'] as const
type Theme = typeof themes[number]

const [theme, setTheme] = useState<Theme | null>(null)

useEffect(() => {
  const el = document.documentElement
  if (theme !== null) {
    el.setAttribute('data-theme', theme)
  } else {
    const data = el.getAttribute('data-theme') as Theme
    if (data !== theme) setTheme(data)
  }
}, [theme])

useEffect(() => {
  const handler = (): void => {
    let dark = null
    try {
      dark = JSON.parse(window.localStorage.getItem('dark') as string)
    } catch {}
    const storage = dark !== null ? 'dark' : dark === false ? 'light' : 'system'
    setTheme(storage)
  }

  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener('storage', handler)
  }
}, [])
```

Now to change the theme in your app, you'd just call `setTheme` somewhere. I know this might seem convoluted at first, but it works well and can be adapted to any framework. See [`Header.tsx`](./src/components/Header.tsx) for an example.

## Open Graph

To generate [`og.png`](./public/og.png), I used Vercel's [OG Playground](https://og-playground.vercel.app).

Set **size** to `1.9:1` and **Emoji Provider** to `Noto` and paste this template:

```html
<div tw="h-full w-full flex items-center justify-center bg-neutral-50">
  <h2 tw="flex flex-col items-center text-neutral-900">
    <span tw="text-9xl mb-4">🏠</span>
    <span tw="text-8xl">Home</span>
  </h2>
</div>
```
