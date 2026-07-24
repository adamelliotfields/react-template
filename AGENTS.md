# react-template

This is a template repository for React single page applications with Vite, TypeScript, Tailwind, Biome, and shadcn/ui.

## Organization

- `src/components` - App components.
- `src/components/ui` - shadcn/ui components.
- `src/lib` - Utility functions.
- `src/lib/utils.ts` - shadcn/ui utility functions.
- `src/hooks` - React hooks.
- `test` - Unit tests.

## Routing

GitHub Pages routing uses the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique in [`public/404.html`](./public/404.html). Keep `BASE_PATH` in that file in sync with `BASE_PATH` in [`vite.config.ts`](./vite.config.ts). Use the repository path, such as `/react-template`, when the app is hosted at `you.github.io/react-template`, or use `/` for a root `github.io` page or custom domain.

If the app is not deployed to GitHub Pages, this routing setup can be removed.

## Dark Mode

Before React is hydrated, a minified [`theme.js`](./public/theme.js) checks local storage for a saved theme or falls back to `system`. It then sets a `data-theme` attribute on the document element and attaches a mutation observer. The React component [`Theme.tsx`](./src/components/Theme.tsx) updates `data-theme` on change which triggers the observer to update local storage.

## Demo App

The demo app in [`Demo.tsx`](./src/components/Demo.tsx) should be used as a starting point for most projects. It is a familiar collapsible sidebar layout with breadcrumb links, Cmd+K command palette, and the theme toggle.

Use the demo as a reference, but break it up into components to meet the needs of the app you're building and update this `AGENTS.md` file accordingly.

## Formatting

Use StandardJS style:

```yaml
printWidth: 100
tabWidth: 2
useTabs: false
semi: false
singleQuote: true
quoteProps: as-needed
trailingComma: none
bracketSpacing: true
objectWrap: preserve
arrowParens: always
```

## TypeScript

Run `npm run check` or `tsgo -p .` to check types.

## Linting

Run `npm run lint:fix` or `biome check --fix .` to check and fix linting issues.

## Testing

Run `npm test`.

Use `vitest` with `happy-dom`. Prefer React's `act` and `createRoot` with plain DOM queries.

Use [`theme.test.tsx`](./test/theme.test.tsx) as a reference when writing component unit tests.

## Building

Never run `npm start`, `npm run build`, or `npm run preview`. Assume the dev server is already running.
