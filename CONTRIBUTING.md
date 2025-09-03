# Contributing to CodeEditor

## Development

### Start the Dev Server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in development mode.

### Build

```sh
npm run build
```

### Lint

```sh
npm run lint
```

### Preview Production Build

```sh
npm run preview
```

## ESLint Configuration

- The project uses ESLint with recommended React and TypeScript rules.
- See `eslint.config.js` for configuration details.

## Adding or Modifying Features

- All global or shared SCSS should be imported in `src/embed.tsx` to ensure styles are included in the bundle.
- To add new features, create or update components in `src/components/`.

## Pull Requests

- Please ensure all code passes linting and builds successfully before submitting a PR.
- Add or update documentation as needed.
