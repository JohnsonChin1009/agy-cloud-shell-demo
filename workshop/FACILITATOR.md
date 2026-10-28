# Facilitator Guide

For workshop facilitators only. Attendees follow `README.md` and `workshop/CHALLENGE.md`.

## Suggested 20-minute schedule

| Time        | Activity                                                               | README step |
| ----------- | ---------------------------------------------------------------------- | ----------- |
| 0:00–2:00   | Intro: what AGY is, and what we'll build. Show the finished result.    | 1           |
| 2:00–5:00   | Claim credits and link them to a project. Note the project ID.         | Prerequisites |
| 5:00–8:00   | Open Cloud Shell, clone, `npm ci`, `npm run dev`                       | 2–5         |
| 8:00–9:00   | Web Preview on port 5173. Show that search doesn't work yet.           | 6           |
| 9:00–11:00  | Second tab: `gcloud projects list`, `gcloud config set project`, `gcloud auth application-default login`, then install or check AGY, `export AGY_ADC_AUTH=true`, `agy` | 7–8 |
| 11:00–17:00 | Paste the challenge prompt, watch AGY work, verify in the browser      | 9           |
| 17:00–19:00 | `npm test` and walk through AGY's summary                              | 10          |
| 19:00–20:00 | Wrap-up and cleanup                                                    | 12          |

Setup (2:00–11:00) is the riskiest part, and claiming credits is the least predictable.
If you can, send the credit link and instructions **before** the session so attendees
arrive with a billed project and their project ID. Ask attendees to run `npm ci` as early as
possible, and install AGY while it runs if they can.

## Intended outcome

- The sessions search box filters by title or speaker as you type, ignoring case.
- A "No sessions match …" message replaces the list when nothing matches.
- `npm test` passes with no `todo` tests left.
- Attendees saw AGY read project context (`AGENTS.md`, the spec), make a focused
  change, run tests and report its results.

## Expected files to change

| File                                   | Change                                              |
| -------------------------------------- | --------------------------------------------------- |
| `src/lib/filterSessions.ts`            | Implement the filter                                |
| `src/components/SessionList.tsx`       | Render an empty state when the list is empty        |
| `src/lib/filterSessions.test.ts`       | Replace the 4 `it.todo` placeholders with real tests |
| `src/components/SessionList.test.tsx`  | Add UI tests for typing and the empty state         |

Anything outside these files, especially `package.json` or new dependencies, is a sign
the agent wandered off. That's worth pointing out as a teaching moment.

## Reference solution

Full patch: `workshop/reference-solution.patch`. It touches only the 4 files above.

- **`filterSessions`**: trim and lowercase the query, and return all sessions if it's
  empty. Otherwise keep the sessions whose lowercased `title` or `speaker` `includes`
  the query. `Array.filter` keeps the original order.
- **`SessionList`**: if `visibleSessions.length === 0`, render a `role="status"` message,
  "No sessions match "<query>"", with a hint to try another title or speaker.
  Otherwise render the existing `<ul>`.
- **Tests**: unit tests for title match, speaker match, case insensitivity, no results
  and whitespace-only queries. UI tests use `@testing-library/user-event` to type into
  the search box and assert the visible list and the empty state.

Apply it to a clean starter checkout to demo or verify:

```bash
git apply --check workshop/reference-solution.patch   # dry run
git apply workshop/reference-solution.patch
npm test                                               # expect 21 passed, 0 todo
git apply -R workshop/reference-solution.patch         # undo
```

Attendees' solutions don't need to match the patch line for line. Judge them by the
behavior and passing tests.

## Common failure modes and recovery

| Symptom | Likely cause | Recovery |
| --- | --- | --- |
| Web Preview shows 502 or "Couldn't connect" | Dev server stopped, or previewing port 8080 | Restart `npm run dev`, then Web preview → Change port → 5173 |
| "Blocked request. This host is not allowed" | `allowedHosts` was removed from `vite.config.ts` | `git checkout vite.config.ts`, then restart the dev server |
| `Port 5173 is already in use` | A second `npm run dev` | Press Ctrl+C in the old tab. The port is fixed (`strictPort`) on purpose, so Web Preview instructions stay valid. |
| `agy: command not found` | `~/.local/bin` not on PATH | `export PATH="$HOME/.local/bin:$PATH"` |
| Credits claimed but project not in `gcloud projects list` | Cloud Shell is signed in with a different account, or the project wasn't created | Check `gcloud auth list`. Create the project and link the credit billing account in the Console. |
| `Cannot find a quota project to add to ADC` after sign-in | `gcloud config set project` was skipped or ran after login | `gcloud auth application-default set-quota-project <PROJECT_ID>` |
| AGY reports billing, quota or "API not enabled" | Billing not linked to the project, or wrong project set | Check billing in the Console, then `gcloud config set project <PROJECT_ID>` and sign in again |
| `Error 400: invalid_request` on AGY sign-in | Attendee used AGY's browser OAuth login, which Cloud Shell rejects | Redo README Step 7, then `export AGY_ADC_AUTH=true` and `agy` |
| AGY sign-in still fails with ADC | Account lacks AGY access, or `AGY_ADC_AUTH` not exported in this tab | Re-export in the current tab and retry, then fall back (below) |
| AGY edits but tests fail | Agent stopped early | Paste: *"Run `npm test`, fix the failures, and summarize."* |
| AGY applied `workshop/reference-solution.patch` | Agent ignored `AGENTS.md` | Run `git checkout -- src` and re-prompt. Point out that agents can read anything in the repo. |
| AGY adds a dependency or refactors other files | Over-eager agent | `git diff --stat`, `git checkout -- <file>` for the unrelated changes, then re-prompt with "keep it focused" |
| Attendee wants to restart | n/a | `git checkout -- src` |

## Fallback plan

- **AGY unavailable for one attendee:** pair them with a neighbour, or have them
  follow along on the projector.
- **AGY unavailable for everyone:** run the challenge live on the facilitator's
  machine. If that fails too, apply the reference patch live
  (`git apply workshop/reference-solution.patch`), show `git diff`, run `npm test`
  and refresh Web Preview.
- **Cloud Shell unavailable:** the project runs locally with Node 22.12+.
  Run `npm ci && npm run dev`, then open <http://localhost:5173>.
- **Out of time:** skip the browser check and finish with `npm test`.

Rehearse the fallback demo beforehand, on a fresh clone with AGY already signed in.

## Final verification checklist (run before the workshop)

On a fresh clone, ideally in Cloud Shell with a non-facilitator account:

- [ ] `npm ci` completes, and `npm audit` shows no vulnerabilities.
- [ ] `npm test` shows all tests passing with 4 todo.
- [ ] `npm run build` succeeds.
- [ ] `npm run dev` starts on port 5173. Web Preview → Change port → 5173 shows the dashboard.
- [ ] Editing a file hot-reloads the Web Preview tab. (Not yet verified in Cloud Shell; if it doesn't, attendees refresh.)
- [ ] Typing in the search box does **not** filter (starter is genuinely unfinished).
- [ ] Claiming credits and linking them to a new project works with a fresh, attendee-type account. Time it.
- [ ] `agy --version` works after the install step. `gcloud projects list` → `gcloud config set project` → `gcloud auth application-default login` (no quota-project warning) → `export AGY_ADC_AUTH=true` → `agy` signs in.
- [ ] The challenge prompt completes in AGY in about 5–7 minutes, and `npm test` then passes with 0 todo.
- [ ] `git apply --check workshop/reference-solution.patch` succeeds on a clean checkout.
- [ ] The clone URL in `README.md` Step 3 and Quick start point to the published repository.
