# react-template

My personal template for React apps. Built for speed ⚡

## Features

- [**Bun**](https://github.com/oven-sh/bun) for dependencies and tests.
- [**Vite**](https://github.com/vitejs/vite) for builds.
- [**SWC**](https://github.com/vitejs/vite-plugin-react-swc) for hot reloading.
- [**Biome**](https://github.com/biomejs/biome) for linting and formatting.
- [**Demo**](https://aef.me/react-template) with _TypeScript_, _Tailwind_, _HeadlessUI_, _Lucide_, _Jotai_, and _Wouter_.

## Usage

See [`package.json`](./package.json).

```sh
# bun
export PATH="${HOME}/.bun/bin:${PATH}"
curl -fsSL https://bun.sh/install | bash

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

In [`404.html`](./public/404.html), `pathSegmentsToKeep` is set to `1` to keep the base path. This means if your app is hosted at `you.github.io/your-app`, the base path will be `/your-app`, which is what you want.

If this is your root `github.io` page or you're using a custom domain, set `pathSegmentsToKeep` to `0`.

For the actual routing, I use [`wouter`](https://github.com/molefrog/wouter).

## Dark Mode

A minified [`theme.js`](./public/theme.js) is in `index.html`. This script checks for a `dark` key in local storage with the following logic:
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

## Deployment

Build runs on all PRs; deploy runs on pushes or merges to `main`. See [`build.yml`](./.github/workflows/build.yml).
