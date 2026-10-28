# Workshop: Build a Feature with AGY in Google Cloud Shell

In about 20 minutes you'll open a small web app in Google Cloud Shell, ask **AGY**
(Antigravity CLI) to add a missing feature, then see the result in your browser and
check it with tests.

> Commands go in the Cloud Shell terminal. Copy each grey box, paste it into the
> terminal and press **Enter**. To paste in Cloud Shell, use **Ctrl+V** (or **Cmd+V** on a Mac),
> or right-click and choose **Paste**.

## Prerequisites

- A Google account that can open [Google Cloud Shell](https://shell.cloud.google.com).
- Access to AGY with that account. Your facilitator will confirm this.
- A **Google Cloud project with billing linked**. Your facilitator will show you how to
  claim workshop credits and link them to a project at the start of the session.
  Keep the **project ID** handy (for example `my-agy-workshop-123456`).
- A desktop browser (Chrome recommended).

You do **not** need API keys, Docker or anything installed on your own computer.

## Quick start

Already comfortable in a terminal? These are all the setup commands. Steps 2–8
below walk through each one.

**Terminal tab 1: app**

```bash
git clone https://github.com/JohnsonChin1009/agy-cloud-shell-demo.git
cd ~/agy-cloud-shell-demo
npm ci
npm run dev
```

Then open **Web preview → Change port → `5173` → Change and Preview**.

**Terminal tab 2: AGY** (click **+** to open a new tab)

```bash
cd ~/agy-cloud-shell-demo
gcloud projects list                       # find your project ID
gcloud config set project <PROJECT_ID>
gcloud auth application-default login      # follow the link, paste the code back
agy --version || { curl -fsSL https://antigravity.google/cli/install.sh | bash; export PATH="$HOME/.local/bin:$PATH"; }
export AGY_ADC_AUTH=true
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

## Step 2 · Open Google Cloud Shell

1. Go to **<https://shell.cloud.google.com>** and sign in.
2. Wait for the terminal at the bottom to show a prompt that ends in `$`.

## Step 3 · Clone the repository

```bash
git clone https://github.com/JohnsonChin1009/agy-cloud-shell-demo.git
cd ~/agy-cloud-shell-demo
```

## Step 4 · Install dependencies

```bash
npm ci
```

`npm ci` installs the exact versions recorded in `package-lock.json`.

## Step 5 · Start the development server

```bash
npm run dev
```

When you see `VITE ... ready` and `Local: http://localhost:5173/`, the app is running.
**Leave this terminal tab running.**

## Step 6 · Open Web Preview

1. In the Cloud Shell toolbar, click the **Web preview** button. Hover over the
   toolbar icons to find it.
2. Click **Change port**.
3. Type `5173` and click **Change and Preview**.

A new browser tab opens with the dashboard. Type in the session search box and notice
that **nothing filters yet**. That's the feature you're about to build.

## Step 7 · Connect your Google Cloud project and sign in

AGY uses your Google Cloud project (the one with your workshop credits). AGY's own
browser login (the Google OAuth option) fails in Cloud Shell with `Error 400: invalid_request`,
so you sign in with `gcloud` instead.

Open a **second terminal tab**: click the **+** (Open a new tab) next to the current tab
in Cloud Shell. Then go to the project folder:

```bash
cd ~/agy-cloud-shell-demo
```

**1. Find your project ID.** It's in the `PROJECT_ID` column:

```bash
gcloud projects list
```

**2. Set it as your active project.** Replace `<PROJECT_ID>` with your ID, without the `< >`:

```bash
gcloud config set project <PROJECT_ID>
```

**3. Sign in:**

```bash
gcloud auth application-default login
```

Answer `Y` if asked to continue, open the link it prints, sign in with your Google
account, then copy the verification code back into the terminal.

## Step 8 · Launch AGY in the project directory

Stay in the second tab. Check whether AGY is installed:

```bash
agy --version
```

If you see `command not found`, install it:

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
agy --version
```

Tell AGY to use your sign-in from Step 7, then start it **from inside the project folder**:

```bash
export AGY_ADC_AUTH=true
agy
```

If AGY asks whether to trust this folder, say yes.

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
| `Port 5173 is already in use` | Another dev server is already running. Find that terminal tab and press **Ctrl+C**, then run `npm run dev` again. |
| Web Preview shows "Couldn't connect" or 502 | Make sure `npm run dev` is still running, and that you previewed port **5173**, not 8080. |
| Web Preview says "Blocked request. This host is not allowed" | You've edited `vite.config.ts`. Run `git checkout vite.config.ts` and restart `npm run dev`. |
| Page doesn't update after AGY changes code | Refresh the Web Preview tab. |
| `agy: command not found` after installing | Run `export PATH="$HOME/.local/bin:$PATH"`. |
| `gcloud projects list` shows nothing, or not your project | You may be signed in with a different Google account. Check with `gcloud auth list`, and confirm with your facilitator that your credits are linked to a project. |
| Sign-in shows `Cannot find a quota project to add to ADC` | Run `gcloud auth application-default set-quota-project <PROJECT_ID>`, then continue with Step 8. |
| AGY shows `Error 400: invalid_request` when signing in | That's the browser login, which doesn't work in Cloud Shell. Exit with **Ctrl+C** and redo Step 7, then `export AGY_ADC_AUTH=true` and `agy`. |
| AGY reports a billing, quota or "API not enabled" error | Your project may not have billing linked. Check with your facilitator, then re-run `gcloud config set project <PROJECT_ID>`. |
| AGY asks you to sign in again in a new terminal tab | `export` only applies to the current tab. Run `export AGY_ADC_AUTH=true` in that tab before `agy`. |
| Cloud Shell disconnected | Reopen it. Your files stay in your home directory. Run `cd ~/agy-cloud-shell-demo` and start again from Step 5. |
| Want to start the challenge over | Run `git checkout -- src` to discard your changes to the app. |

## Step 12 · Cleanup

1. Stop the dev server: in its tab, press **Ctrl+C**.
2. Exit AGY: press **Ctrl+C** until you're back at the `$` prompt.
3. Optionally delete the project from your Cloud Shell home directory:

```bash
cd ~ && rm -rf ~/agy-cloud-shell-demo
```

The app itself created nothing in Google Cloud. AGY's usage is charged to your project's
credits. If you made a project just for this workshop and don't need it any more, you can
shut it down, which also stops any further charges:

```bash
gcloud projects delete <PROJECT_ID>
```

---

**For coding agents:** see [`AGENTS.md`](AGENTS.md) and [`docs/PROJECT_SPEC.md`](docs/PROJECT_SPEC.md).
**For facilitators:** see [`workshop/FACILITATOR.md`](workshop/FACILITATOR.md).
