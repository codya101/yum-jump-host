#!/usr/bin/env bash
# ---------------------------------------------------------------
# Deploy dist/ to an Apache host over scp/ssh.
#
# Usage:
#   npm run deploy          # full deploy
#   npm run deploy:dry      # print what would happen, do nothing
#
# Configuration: create a `deploy.env` in the repo root (git-ignored)
# with these variables, or export them in your shell before running:
#
#   DEPLOY_USER=myuser
#   DEPLOY_HOST=example.com
#   DEPLOY_PATH=/var/www/mygame          # absolute path on the remote host
#   DEPLOY_PORT=22                       # optional, default 22
#   DEPLOY_SSH_KEY=~/.ssh/id_ed25519     # optional, use ssh-agent otherwise
#
# The script supports DRY_RUN=1 to print commands without executing them.
# ---------------------------------------------------------------

set -euo pipefail

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

DIST_DIR="dist"
if [[ ! -d "$DIST_DIR" ]]; then
  echo "error: $DIST_DIR/ not found. Run 'npm run build' first." >&2
  exit 1
fi

SSH_OPTS=(-p "$DEPLOY_PORT" -o StrictHostKeyChecking=accept-new)
SCP_OPTS=(-P "$DEPLOY_PORT" -o StrictHostKeyChecking=accept-new -r -p)

if [[ -n "${DEPLOY_SSH_KEY:-}" ]]; then
  SSH_OPTS+=(-i "$DEPLOY_SSH_KEY")
  SCP_OPTS+=(-i "$DEPLOY_SSH_KEY")
fi

TARGET="${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
STAGING="${DEPLOY_PATH%/}/.staging-${STAMP}"
BACKUP="${DEPLOY_PATH%/}/.backup-${STAMP}"

run() {
  if [[ "$DRY_RUN" == "1" ]]; then
    echo "+ $*"
  else
    echo "+ $*"
    eval "$@"
  fi
}

echo "==> deploy target: $TARGET (port $DEPLOY_PORT)"
echo "==> staging: $STAGING"
echo "==> backup:  $BACKUP"
[[ "$DRY_RUN" == "1" ]] && echo "==> DRY_RUN=1: commands will be printed, not executed."

# 1. Ensure target directory exists on the host.
run "ssh ${SSH_OPTS[*]} ${DEPLOY_USER}@${DEPLOY_HOST} 'mkdir -p \"${DEPLOY_PATH}\" \"${STAGING}\"'"

# 2. Upload dist/* into the staging directory.
run "scp ${SCP_OPTS[*]} ${DIST_DIR}/. ${DEPLOY_USER}@${DEPLOY_HOST}:${STAGING}/"

# 3. Swap: current -> backup, staging -> current. Then prune old backups (keep last 3).
REMOTE_SWAP=$(cat <<EOF
set -e
cd "${DEPLOY_PATH}"
# Move existing top-level files/dirs (except our staging/backup dirs) to backup.
mkdir -p "${BACKUP}"
for entry in * .[!.]* ..?*; do
  case "\$entry" in
    .staging-*|.backup-*|''|'*'|'.[!.]*'|'..?*') continue ;;
  esac
  [ -e "\$entry" ] && mv "\$entry" "${BACKUP}/" || true
done
# Promote staging contents to current.
mv "${STAGING}"/* "${DEPLOY_PATH}"/ 2>/dev/null || true
mv "${STAGING}"/.[!.]* "${DEPLOY_PATH}"/ 2>/dev/null || true
rmdir "${STAGING}" || true
# Keep only the 3 newest backups.
ls -1dt "${DEPLOY_PATH%/}"/.backup-* 2>/dev/null | tail -n +4 | xargs -r rm -rf
EOF
)

run "ssh ${SSH_OPTS[*]} ${DEPLOY_USER}@${DEPLOY_HOST} \"${REMOTE_SWAP//\"/\\\"}\""

echo "==> done."
