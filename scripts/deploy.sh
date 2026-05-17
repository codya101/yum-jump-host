#!/usr/bin/env bash
# ---------------------------------------------------------------
# Deploy dist/ to a static host with rsync over SSH.
#
# Usage:
#   npm run deploy          # build + deploy
#   npm run deploy:dry      # build + show exactly what would change, do nothing
#
# Why rsync: it is the standard for static-site deploys. Only changed
# files are transferred, --delete keeps the remote an exact mirror of
# dist/, and the whole thing is one idempotent command.
#
# Configuration: create a `deploy.env` in the repo root (git-ignored)
# with these variables, or export them in your shell before running:
#
#   DEPLOY_USER=codya100
#   DEPLOY_HOST=obraxusgames.com
#   DEPLOY_PATH=/home/codya100/obraxusgames.com   # absolute path on the host
#   DEPLOY_PORT=22                                # optional, default 22
#   DEPLOY_SSH_KEY=~/.ssh/id_rsa                  # optional, use ssh-agent/config otherwise
#   DEPLOY_EXCLUDES=".well-known"                 # optional, extra space-separated
#                                                 # paths to never upload or delete
#
# DRY_RUN=1 prints the rsync plan without changing anything.
# ---------------------------------------------------------------

set -euo pipefail

# Run from the repo root regardless of where the script is invoked.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Load deploy.env if present.
if [[ -f "deploy.env" ]]; then
  # shellcheck disable=SC1091
  set -a; source "deploy.env"; set +a
fi

: "${DEPLOY_USER:?set DEPLOY_USER (e.g. in deploy.env)}"
: "${DEPLOY_HOST:?set DEPLOY_HOST (e.g. in deploy.env)}"
: "${DEPLOY_PATH:?set DEPLOY_PATH (absolute path on the remote host)}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
DRY_RUN="${DRY_RUN:-0}"

# Allow --dry-run / -n as an argument too (works the same as DRY_RUN=1).
# This keeps the npm scripts cross-platform: a `VAR=1 cmd` prefix is not
# valid syntax under cmd.exe, which npm uses to run scripts on Windows.
for arg in "$@"; do
  case "$arg" in
    --dry-run|-n) DRY_RUN=1 ;;
  esac
done

DIST_DIR="dist"
if [[ ! -d "$DIST_DIR" ]]; then
  echo "error: $DIST_DIR/ not found. Run 'npm run build' first." >&2
  exit 1
fi

# On Windows the only working rsync is cwrsync (cygwin). Its rsync must
# use its OWN bundled cygwin ssh -- native Windows OpenSSH fails with
# "dup() in/out/err failed". Put cwrsync's bin first so `ssh` resolves
# to the bundled one. Harmless/no-op on Linux and macOS.
CWRSYNC_BIN="${HOME}/scoop/apps/cwrsync/current/bin"
if [[ -x "${CWRSYNC_BIN}/ssh.exe" ]]; then
  PATH="${CWRSYNC_BIN}:${PATH}"
fi

# SSH transport for rsync. accept-new trusts a new host on first use
# but still detects key changes afterwards.
SSH_CMD="ssh -p ${DEPLOY_PORT} -o StrictHostKeyChecking=accept-new"
if [[ -n "${DEPLOY_SSH_KEY:-}" ]]; then
  SSH_CMD="${SSH_CMD} -i ${DEPLOY_SSH_KEY}"
fi

# -rltpz + --chmod, not -a: -p makes rsync enforce permissions on every
# run, and --chmod overrides the (wrong, 0700) perms that files copied
# from Windows/cygwin would otherwise get -- forcing dirs 755, files 644
# so the web server can read them (otherwise 403). This is idempotent
# and self-healing: a re-deploy fixes perms even on unchanged files.
# Never upload or delete .dh-diag -- DreamHost's root-owned diagnostics
# symlink, which must be left alone.
RSYNC_OPTS=(-rltpz --chmod=D755,F644 --delete --human-readable --itemize-changes)
RSYNC_OPTS+=(--exclude='.dh-diag')
for ex in ${DEPLOY_EXCLUDES:-}; do
  RSYNC_OPTS+=(--exclude="${ex}")
done
[[ "$DRY_RUN" == "1" ]] && RSYNC_OPTS+=(--dry-run)

TARGET="${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH%/}/"

echo "==> deploy target: ${TARGET} (port ${DEPLOY_PORT})"
echo "==> source:        ${DIST_DIR}/"
if [[ "$DRY_RUN" == "1" ]]; then
  echo "==> DRY_RUN=1: showing the rsync plan, nothing will change."
fi

rsync "${RSYNC_OPTS[@]}" -e "${SSH_CMD}" "${DIST_DIR}/" "${TARGET}"

echo "==> done."
