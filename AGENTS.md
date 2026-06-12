# react-template

This is a template repository for React single page applications with Vite, TypeScript, Tailwind, Biome, and shadcn/ui.

## Organization

- `src/components` - App components.
- `src/components/ui` - shadcn/ui components.
- `src/lib` - Utility functions.
- `src/lib/utils.ts` - shadcn/ui utility functions.
- `src/hooks` - React hooks.
- `test` - All tests.

## Dark Mode

Before React is hydrated, a minified [`theme.js`](./public/theme.js) checks local storage for a saved theme or falls back to `system`. It then sets a `data-theme` attribute on the document element and attaches a mutation observer. The React component [`Theme.tsx`](./src/components/Theme.tsx) updates `data-theme` on change which triggers the observer to update local storage.

## Demo App

The demo app in [`Demo.tsx`](./src/components/Demo.tsx) should be used as a starting point for most projects. It is a familiar collapsible sidebar layout with breadcrumb links, Cmd+K command palette, and the theme toggle.

Use the demo as a reference, but break it up into components to meet the needs of the app you're building and update this `AGENTS.md` file accordingly.

## Development

Use `pnpm` locally.

NPM is only used in CI. After updating packages, run `npm i --package-lock-only` to sync the lock file.

### Formatting

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

### TypeScript

Run `pnpm check` or `tsgo --noEmit --incremental` to check types.

### Linting

Run `pnpm lint:fix` or `biome check --fix` to check and fix linting issues.

### Testing

Run `pnpm test`.

Use `vitest` with `act` from `react`. Use [`theme.test.tsx`](./test/theme.test.tsx) as a reference when writing component unit tests.

### Building

Never run `pnpm start` or `pnpm build` unless explicitly asked. Assume continuous builds are happening in the background. You'll be notified of any errors.
