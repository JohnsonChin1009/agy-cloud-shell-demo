# Hands-on challenge: session search

Copy everything inside the box below and paste it into AGY.

```text
I'm working in a small React + TypeScript + Vite project. Please complete the
unfinished session search feature.

1. Before editing anything, read AGENTS.md and docs/PROJECT_SPEC.md, then look
   around the project and briefly tell me how it is structured.
2. Find the incomplete session search feature (look for TODO(workshop) markers)
   and explain what is missing.
3. Implement the behavior described in the "Session search" section of
   docs/PROJECT_SPEC.md:
   - search by session title or speaker name
   - results update immediately as the user types
   - case-insensitive matching
   - a helpful empty state when no sessions match
4. Replace the it.todo placeholders with real tests, and add UI tests for
   searching and the empty state. Cover matching, case insensitivity and no results.
5. Run the relevant tests and the type check, and fix any failures.
6. Finish with a short summary: the files you changed, what you changed in each,
   and the test and type-check results.

Keep the change focused: don't add dependencies or refactor unrelated code.
```

## When AGY finishes

1. Switch to your **Web Preview** tab and try searching for `typescript`, `ELENA` and `kubernetes`.
2. In a terminal, run `npm test`. Every test should pass, and none should be marked **todo**.

**Stretch:** ask AGY, *"Also let the search match a session's track, and update the tests."*
