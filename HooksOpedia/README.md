# Lifecycle Events and Routing

Demonstrates React hooks and the component lifecycle:

- `useState` for the parent and child counters, and the mount/unmount toggle
- `useEffect` with a dependency array (runs when a value changes), an empty array (runs on mount, cleanup on unmount) and no array (runs after every render)
- `useRef` for values that persist without re-rendering (first-render flag, render count) and for DOM access (focusing the input on mount)

Open the browser console to see the lifecycle logs.

# Project Structure

```
src/
  components/
    hooks/      SampleDemo (parent: counter + mount toggle), LifeCycleDemo (child: effects and refs)
  styles/       main.css
  test/         setup.js - Vitest + Testing Library setup
  App.jsx       page layout
  main.jsx      mounts <App /> inside <StrictMode>
```

Tests live next to the code they cover (`*.test.jsx`).

## Scripts

| Command              | What it does                  |
| -------------------- | ----------------------------- |
| `npm run dev`        | Start the dev server          |
| `npm test`           | Run the tests once            |
| `npm run test:watch` | Re-run tests on file changes  |
| `npm run lint`       | Lint with ESLint              |
| `npm run build`      | Production build into `dist/` |

## Conventions

- Refs are never read during render; values shown on screen live in state, and the render count is written to the DOM from an effect.
- StrictMode mounts, unmounts and remounts components once in development. The mount effect's cleanup resets the first-render flag so the update effects still skip the initial mount.
- React Compiler is enabled in `vite.config.js`, so there is no manual `useMemo`/`useCallback`.
