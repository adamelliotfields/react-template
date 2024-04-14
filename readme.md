# react-template

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/adamelliotfields/react-template?devcontainer_path=.devcontainer/devcontainer.json&machine=basicLinux32gb)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://pr.new/adamelliotfields/react-template)

My personal template for React apps. Built for speed ⚡

## Features

- [**Bun**](https://github.com/oven-sh/bun) for dependencies and tests.
- [**Vite**](https://github.com/vitejs/vite) for builds.
- [**Tailwind**](https://github.com/tailwindlabs/tailwindcss) with [shadcn-ui](https://github.com/shadcn-ui/ui).
- [**SWC**](https://github.com/vitejs/vite-plugin-react-swc) for hot reloading.
- [**Biome**](https://github.com/biomejs/biome) for linting and formatting.
- [**Demo**](https://aef.me/react-template) 🚀

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

### `shadcn-ui`

Use `bun ui` as a shorthand for `bunx shadcn-ui`. For example, `bun ui add drawer` will add the [drawer](https://ui.shadcn.com/docs/components/drawer) component and install [vaul](https://github.com/emilkowalski/vaul).

## Configuration

Use [`.env`](./.env) for settings like title and description; use `.env.local` for secrets (Git ignored).

Set `VITE_HOMEPAGE` to the production URL of your app.

### GitHub Pages SPA

I'm using the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique to support client-side routing.

In [`404.html`](./public/404.html), `PATH_SEGMENTS` is set to `1` to keep the base path. This means if your app is hosted at `you.github.io/your-app`, the base path will be `/your-app`, which is what you want.

If this is your root `github.io` page or you're using a custom domain, set `PATH_SEGMENTS` to `0`.

For the actual routing, I use [wouter](https://github.com/molefrog/wouter).

## Deployment

Build runs on all PRs; deploy runs on pushes or merges to `main`. See [`build.yml`](./.github/workflows/build.yml).

## Utilities

See [`clamp`](./src/lib/clamp.ts), [`debounce`](./src/lib/debounce.ts), [`formatDate`](./src/lib/format-date.ts), [`random`](./src/lib/random.ts), [`range`](./src/lib/range.ts), [`sleep`](./src/lib/sleep.ts), [`throttle`](./src/lib/throttle.ts), [`uid`](./src/lib/uid.ts), and [`useOS`](./src/lib/use-os.ts).

The [`utils.ts`](./src/lib/utils.ts) file is reserved for `shadcn-ui` utilities like `cn` for classnames.

## Dark Mode

A [minified](https://try.terser.org) [`theme.js`](./public/theme.js) is in [`index.html`](./index.html). This script checks for a `dark` key in local storage with the following logic:
  1. If `true`, then `data-theme` is set to `dark`.
  2. If `false`, then `data-theme` is set to `light`.
  3. Otherwise `data-theme` is set to `system`.

A mutation observer watches for changes to the `data-theme` attribute, and an event handler listens for changes to the `prefers-color-scheme` media query.

Before the theme is updated, all transitions are temporarily disabled so the update is instant.

In your app, you just need to put this somewhere:

```tsx
const themes = ['dark', 'light', 'system'] as const
type Theme = typeof themes[number]

const [theme, setTheme] = useState<Theme | null>(null)

// runs when theme changes
useEffect(() => {
  const el = document.documentElement
  if (theme !== null) {
    el.setAttribute('data-theme', theme)
  } else {
    const data = el.getAttribute('data-theme') as Theme
    if (data !== theme) setTheme(data)
  }
}, [theme])

// runs on mount
useEffect(() => {
  const handler = (): void => {
    let dark = null
    try {
      dark = JSON.parse(window.localStorage.getItem('dark') as string)
    } catch {}
    const storage = dark === true ? 'dark' : dark === false ? 'light' : 'system'
    setTheme(storage)
  }

  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}, [])
```

Now to change the theme in your app, you'd just call `setTheme` somewhere. I know this might seem convoluted at first, but it works well and can be adapted to any framework. See [`Header.tsx`](./src/components/Header.tsx) for an example.

## Open Graph

To generate [`og.png`](./public/og.png), I used Vercel's [OG Playground](https://og-playground.vercel.app):
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
    <p tw="text-4xl">A starter kit with Vite, TypeScript, Tailwind, and more.</p>
  </div>
</div>
```
