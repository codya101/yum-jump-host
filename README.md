# Web Host for my Game

A static single-page React / TypeScript site, built with **Vite**, styled with
**Tailwind CSS v4**, routed with **React Router**, and designed to be compiled
into plain `dist/` output and shipped to an **Apache** web host over `scp`.

There is no backend. Everything in `dist/` is static HTML, CSS, JS, and assets.

---

## Stack

| Layer          | Choice                                          |
| -------------- | ----------------------------------------------- |
| Framework      | React 19 + TypeScript (strict)                  |
| Build tool     | Vite 6                                          |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`)       |
| Routing        | React Router 7 (`react-router-dom`)             |
| Linting        | ESLint 9 (flat config) + `typescript-eslint`    |
| Formatting     | Prettier 3                                      |
| Package mgr    | npm                                             |
| Target host    | Apache (SPA fallback via `.htaccess`)           |

---

## Project layout

```
.
├── index.html                  # HTML entry, references src/main.tsx
├── package.json                # scripts + deps
├── vite.config.ts              # Vite + Tailwind v4 plugin + @ alias
├── tsconfig*.json              # TypeScript project references
├── eslint.config.js            # ESLint flat config
├── .prettierrc.json            # Prettier config
├── .editorconfig
├── .gitignore
├── .env.example                # template for VITE_* runtime vars
├── public/
│   ├── .htaccess               # Apache SPA fallback + caching + headers
│   └── favicon.svg
├── scripts/
│   └── deploy.sh               # scp-based deploy to Apache
└── src/
    ├── main.tsx                # React + Router bootstrap
    ├── App.tsx                 # Shell layout (header/main/footer)
    ├── index.css               # @import 'tailwindcss';
    ├── vite-env.d.ts
    └── pages/
        ├── Home.tsx
        ├── About.tsx
        └── NotFound.tsx
```

Path alias: `@/` → `src/` (configured in both `vite.config.ts` and
`tsconfig.app.json`).

---

## Prerequisites

- **Node.js ≥ 20** — [nodejs.org](https://nodejs.org)
- **npm ≥ 10** (ships with Node 20)
- For deploys: **OpenSSH client** (`ssh`, `scp`). On Windows this is built into
  modern Windows 10/11, or available via Git Bash / WSL.

Verify:

```bash
node -v
npm -v
ssh -V
```

---

## Local development

Install dependencies once:

```bash
npm install
```

Run the dev server (HMR, opens http://localhost:5173):

```bash
npm run dev
```

Type-check without emitting:

```bash
npm run typecheck
```

Lint / format:

```bash
npm run lint
npm run lint:fix
npm run format
```

---

## Production build

Build the static site into `dist/`:

```bash
npm run build
```

Preview the production bundle locally (serves `dist/` on http://localhost:4173):

```bash
npm run preview
# or the alias
npm run serve
```

Clean the output directory:

```bash
npm run clean
```

### Sub-path hosting

If your site lives at `https://example.com/mygame/` rather than the domain
root, edit `vite.config.ts` and set:

```ts
base: '/mygame/',
```

This rewrites every asset URL and React Router's default base accordingly.

---

## Deploying to Apache over scp

The bundled `scripts/deploy.sh` uploads `dist/` to a staging directory on the
remote host, atomically swaps it in, and keeps the previous 3 releases as
`.backup-<timestamp>` directories for easy rollback.

### 1. Configure the remote host

Create a git-ignored **`deploy.env`** in the repo root (a template is below):

```bash
# deploy.env — DO NOT COMMIT
DEPLOY_USER=myuser
DEPLOY_HOST=example.com
DEPLOY_PATH=/var/www/mygame          # absolute path on the Apache host
DEPLOY_PORT=22                        # optional
DEPLOY_SSH_KEY=~/.ssh/id_ed25519      # optional; otherwise ssh-agent is used
```

`DEPLOY_PATH` must be the document root (or sub-directory) your Apache
`VirtualHost` serves. The user needs write permission on that directory.

### 2. Ensure Apache is ready

On the server, the `VirtualHost` that serves `DEPLOY_PATH` must allow
`.htaccess` overrides so the SPA fallback works:

```apache
<Directory /var/www/mygame>
    AllowOverride All
    Require all granted
</Directory>
```

Enable the required modules once:

```bash
sudo a2enmod rewrite headers deflate mime
sudo systemctl reload apache2
```

### 3. Deploy

Dry run first (prints commands, touches nothing):

```bash
npm run deploy:dry
```

Real deploy (builds, then ships to the host):

```bash
npm run deploy
```

The script:

1. Runs `npm run build` to produce `dist/`.
2. `scp -r dist/.` → `DEPLOY_PATH/.staging-<timestamp>/` on the host.
3. Moves the current files into `.backup-<timestamp>/` and promotes staging.
4. Prunes backups, keeping the 3 most recent.

Because the swap is a `mv`, the visible downtime is sub-second.

### Manual one-shot alternative

If you just want a no-frills upload and don't care about atomic swaps or
backups, you can bypass the script entirely:

```bash
npm run build
scp -r dist/. myuser@example.com:/var/www/mygame/
```

Or, with `rsync` (delete stale files, show progress):

```bash
npm run build
rsync -avz --delete dist/ myuser@example.com:/var/www/mygame/
```

### Rollback

On the Apache host:

```bash
cd /var/www/mygame
# pick the backup you want
ls -1dt .backup-*
# swap it back in
mv * /tmp/bad-release/
mv .backup-<timestamp>/* .
```

---

## `.htaccess` behavior

`public/.htaccess` is copied verbatim into `dist/.htaccess` on every build. It
provides:

- **SPA fallback** — any URL that isn't a real file or directory is rewritten
  to `index.html` so React Router can handle client-side routes.
- **Aggressive caching** — hashed assets under `/assets/` get
  `Cache-Control: public, max-age=31536000, immutable`.
- **No caching of `index.html`** — clients always fetch a fresh entry point
  and therefore always pick up the new asset URLs.
- **gzip compression** via `mod_deflate`.
- **Basic security headers** — `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`.

If your host disables `AllowOverride`, lift these rules into the main Apache
config instead.

---

## Environment variables

Runtime values for the client bundle go in `.env` (copy `.env.example`). Vite
only exposes variables prefixed with `VITE_`:

```bash
# .env
VITE_GAME_BUILD=2026.04.23
```

Read them in code via `import.meta.env.VITE_GAME_BUILD`. They are **inlined at
build time** — do not put secrets here.

---

## Troubleshooting

- **404 on refresh of a sub-route** — Apache isn't honoring `.htaccess`.
  Confirm `AllowOverride All`, `mod_rewrite` enabled, and that `.htaccess`
  actually ended up in `dist/` (it will, as long as it lives in `public/`).
- **Assets 404 after deploy** — you likely moved the site into a sub-path
  without updating `base` in `vite.config.ts`. Rebuild and redeploy.
- **Permission denied during scp** — the SSH user lacks write access to
  `DEPLOY_PATH`. Either `chown` the directory to that user or deploy as root.
- **`npm run deploy` fails on Windows** — run it from Git Bash, WSL, or
  PowerShell with OpenSSH + Bash available. The script is POSIX shell.

---

## Scripts reference

| Command              | What it does                                       |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Start Vite dev server on :5173 with HMR            |
| `npm run build`      | Type-check + produce `dist/`                       |
| `npm run preview`    | Serve `dist/` on :4173 (production preview)        |
| `npm run serve`      | Alias for `preview`                                |
| `npm run typecheck`  | `tsc -b --noEmit` across project references        |
| `npm run lint`       | Run ESLint                                         |
| `npm run lint:fix`   | ESLint with `--fix`                                |
| `npm run format`     | Prettier-format `src/`                             |
| `npm run clean`      | Remove `dist/`                                     |
| `npm run deploy`     | Build, then scp-deploy to `DEPLOY_*` target        |
| `npm run deploy:dry` | As above but prints commands instead of running    |
