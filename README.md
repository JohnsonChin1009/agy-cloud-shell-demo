# Workshop: Build a Feature with AGY in Google Cloud Shell

In about 20 minutes you'll open a small web app in Google Cloud Shell, ask **AGY**
(Antigravity CLI) to add a missing feature, then see the result in your browser and
check it with tests.

> Commands go in the Cloud Shell terminal. Copy each grey box, paste it into the
> terminal and press **Enter**. To paste in Cloud Shell, use **Ctrl+V** (or **Cmd+V** on a Mac),
> or right-click and choose **Paste**.

## Quick start

Already comfortable in a terminal? These are all the setup commands. Steps 3–8
below walk through each one.

**Terminal tab 1: app**

```bash
git clone https://github.com/JohnsonChin1009/agy-cloud-shell-demo.git
cd ~/agy-cloud-shell-demo
node --version            # need v22.12+; if lower: nvm install 22 && nvm use 22
npm ci
npm run dev
```

Then open **Web preview → Change port → `5173` → Change and Preview**.

**Terminal tab 2: AGY** (click **+** to open a new tab)

```bash
cd ~/agy-cloud-shell-demo
agy --version || { curl -fsSL https://antigravity.google/cli/install.sh | bash; export PATH="$HOME/.local/bin:$PATH"; }
agy
```

Then paste the prompt from [`workshop/CHALLENGE.md`](workshop/CHALLENGE.md) into AGY (Step 9).

---

## Step 1 · What you will build

The starter app is a dashboard for **Harbor DevConf 2026**, an imaginary developer
event. It shows event stats, upcoming sessions and recent attendee activity.

The sessions list has a **search box that doesn't work yet**. Your job is to get
AGY to make it work:

- Typing filters sessions by **title** or **speaker name**, as you type.
- Upper and lower case don't matter.
- If nothing matches, a friendly "no results" message appears.
- Tests prove all of the above.

## Step 2 · Prerequisites

- A Google account that can open [Google Cloud Shell](https://shell.cloud.google.com).
- Access to AGY with that account. Your facilitator will confirm this.
- A desktop browser (Chrome recommended).

You do **not** need a credit card, billing, a Cloud project, API keys or Docker.

## Step 3 · Open Google Cloud Shell

1. Go to **<https://shell.cloud.google.com>** and sign in.
2. Wait for the terminal at the bottom to show a prompt that ends in `$`.

## Step 4 · Clone the repository

```bash
git clone https://github.com/JohnsonChin1009/agy-cloud-shell-demo.git
cd ~/agy-cloud-shell-demo
```

## Step 5 · Install dependencies

First check your Node.js version:

```bash
node --version
```

If it shows **v22.12 or higher**, skip ahead. Otherwise, install Node 22 (takes about 30 seconds):

```bash
nvm install 22 && nvm use 22
```

Then install the project's packages:

```bash
npm ci
```

`npm ci` installs the exact versions recorded in `package-lock.json`.

## Step 6 · Start the development server

```bash
npm run dev
```

When you see `VITE ... ready` and `Local: http://localhost:5173/`, the app is running.
**Leave this terminal tab running.**

## Step 7 · Open Web Preview

1. In the Cloud Shell toolbar, click the **Web preview** button. Hover over the
   toolbar icons to find it.
2. Click **Change port**.
3. Type `5173` and click **Change and Preview**.

A new browser tab opens with the dashboard. Type in the session search box and notice
that **nothing filters yet**. That's the feature you're about to build.

## Step 8 · Launch AGY in the project directory

Open a **second terminal tab**: click the **+** (Open a new tab) next to the current tab
in Cloud Shell. Then go to the project:

```bash
cd ~/agy-cloud-shell-demo
```

Check whether AGY is installed:

```bash
agy --version
```

If you see `command not found`, install it:

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
agy --version
```

Start AGY **from inside the project folder**:

```bash
agy
```

On first launch, AGY asks you to sign in. Choose **Google OAuth**, open the link it shows,
sign in, then copy the code back into the terminal. If AGY asks whether to trust this
folder, say yes.

AGY automatically reads [`AGENTS.md`](AGENTS.md), which points it to the project spec in
[`docs/PROJECT_SPEC.md`](docs/PROJECT_SPEC.md).

## Step 9 · The hands-on challenge

1. Open [`workshop/CHALLENGE.md`](workshop/CHALLENGE.md) and copy the prompt inside the box.
2. Paste it into AGY and press **Enter**.
3. Watch what AGY reads and changes. Approve its actions when it asks.
4. When it's done, switch to the **Web Preview** tab. Vite reloads automatically.
   If it doesn't, refresh the page.
5. Try these searches:
   - `typescript` shows one session (search by title)
   - `ELENA` shows one session (search by speaker, ignoring case)
   - `kubernetes` shows the "no results" message

**Stretch (optional):** ask AGY to make the search also match the session's track,
and to update the tests.

## Step 10 · How to run tests

You can do this in a third tab, or exit AGY first. Make sure you're in `~/agy-cloud-shell-demo`.

```bash
npm test
```

| When                   | Expected result                                          |
| ---------------------- | -------------------------------------------------------- |
| Before the challenge   | All tests pass, with 4 marked **todo**                   |
| After the challenge    | All tests pass, **no todo**, including new search tests  |

Optional extra checks:

```bash
npm run typecheck
npm run build
```

## Step 11 · Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm ci` errors about the Node version, or Vitest won't start | Run `nvm install 22 && nvm use 22`, then `npm ci` again. |
| `Port 5173 is already in use` | Another dev server is already running. Find that terminal tab and press **Ctrl+C**, then run `npm run dev` again. |
| Web Preview shows "Couldn't connect" or 502 | Make sure `npm run dev` is still running, and that you previewed port **5173**, not 8080. |
| Web Preview says "Blocked request. This host is not allowed" | You've edited `vite.config.ts`. Run `git checkout vite.config.ts` and restart `npm run dev`. |
| Page doesn't update after AGY changes code | Refresh the Web Preview tab. |
| `agy: command not found` after installing | Run `export PATH="$HOME/.local/bin:$PATH"`. |
| AGY sign-in loops or fails | Exit AGY with **Ctrl+C**, run `agy` again and pick **Google OAuth**. Ask a facilitator if it keeps failing. |
| Cloud Shell disconnected | Reopen it. Your files stay in your home directory. Run `cd ~/agy-cloud-shell-demo` and start again from Step 6. |
| Want to start the challenge over | Run `git checkout -- src` to discard your changes to the app. |

## Step 12 · Cleanup

1. Stop the dev server: in its tab, press **Ctrl+C**.
2. Exit AGY: press **Ctrl+C** until you're back at the `$` prompt.
3. Optionally delete the project from your Cloud Shell home directory:

```bash
cd ~ && rm -rf ~/agy-cloud-shell-demo
```

Nothing was created in Google Cloud, so there's nothing else to clean up or pay for.

---

**For coding agents:** see [`AGENTS.md`](AGENTS.md) and [`docs/PROJECT_SPEC.md`](docs/PROJECT_SPEC.md).
**For facilitators:** see [`workshop/FACILITATOR.md`](workshop/FACILITATOR.md).
