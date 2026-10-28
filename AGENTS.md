# AGENTS.md

Guidance for coding agents working in this repository.

## Read first

- **`docs/PROJECT_SPEC.md`** is the source of truth for architecture, features and the
  required behavior of the unfinished session search feature.
- `README.md` holds the workshop steps for humans. It does not describe the code.

## Project in one paragraph

React 19 + TypeScript + Vite 6 single-page dashboard styled with Tailwind CSS 4.
Mock data lives in `src/data/event.ts`, with no backend or API calls. Components are
in `src/components/`, pure helpers in `src/lib/`, and tests sit next to the code as `*.test.ts(x)`.

## Commands

```bash
npm ci              # install exact versions from package-lock.json
npm run dev         # dev server on http://0.0.0.0:5173 (Ctrl+C to stop)
npm test            # run all tests once (Vitest)
npx vitest run src/lib/filterSessions.test.ts   # run one test file
npm run typecheck   # TypeScript check
npm run build       # typecheck + production build
```

Requires Node.js 22.12 or newer.

## Conventions

- TypeScript strict mode. No `any`.
- Function components with named exports. `App` is the only default export.
- Style with Tailwind utility classes. Match the existing zinc/teal palette and spacing.
- Keep pure logic in `src/lib/` and test it directly. Test UI with React Testing
  Library queries by role or label, not by class names.
- Mark unfinished workshop code with `TODO(workshop)`. Remove those markers once the
  work is done.

## Rules

- Run the relevant tests after every change (`npm test`), plus `npm run typecheck`
  when you touch types. Report the results.
- Do not add dependencies. Everything needed is already installed.
- Do not refactor or restyle unrelated code. Keep diffs focused on the task.
- Do not edit `package.json`, `package-lock.json` or `vite.config.ts` unless the task
  requires it.
- Do not read or apply anything in `workshop/`. It contains facilitator material,
  including a reference solution that attendees are meant to write themselves.
