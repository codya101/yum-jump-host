#!/usr/bin/env bash
# ---------------------------------------------------------------
# Rebuild the Unity game from source (headless) so the packaged
# demo always contains the latest code.
#
# Usage:
#   npm run build:game
#
# Runs Unity in batch mode against the sibling "Yum Jump" project,
# calling BuildScript.BuildWindows (Assets/Editor/BuildScript.cs),
# which writes Builds/Yum Jump.exe from the enabled Build Settings
# scenes. scripts/package-demo.sh then zips that output.
#
# Overrides:
#   UNITY_EXE=/path/to/Unity.exe       (default: Hub 6000.0.51f1)
#   GAME_PROJECT_DIR="../Yum Jump"     (Unity project root)
# ---------------------------------------------------------------

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

GAME_PROJECT_DIR="${GAME_PROJECT_DIR:-../Yum Jump}"
UNITY_EXE="${UNITY_EXE:-/c/Program Files/Unity/Hub/Editor/6000.0.51f1/Editor/Unity.exe}"

if [[ ! -d "$GAME_PROJECT_DIR" ]]; then
  echo "error: Unity project not found: $GAME_PROJECT_DIR" >&2
  exit 1
fi
if [[ ! -x "$UNITY_EXE" && ! -f "$UNITY_EXE" ]]; then
  echo "error: Unity editor not found at: $UNITY_EXE" >&2
  echo "       set UNITY_EXE to your 6000.0.51f1 Unity.exe." >&2
  exit 1
fi

# Windows-style absolute project path (Unity doesn't grok MSYS paths).
PROJECT_WIN="$(cd "$GAME_PROJECT_DIR" && pwd -W)"
EXE_OUT="${GAME_PROJECT_DIR}/Builds/Yum Jump.exe"
LOG_FILE="${GAME_PROJECT_DIR}/Logs/build.log"

# Refuse to build if the editor already has the project open: a second
# Unity instance on the same project fails partway and is confusing.
if [[ -f "${GAME_PROJECT_DIR}/Temp/UnityLockfile" ]]; then
  echo "error: the Unity Editor appears to have this project open." >&2
  echo "       Close it (or the build will fail), then re-run." >&2
  exit 1
fi

echo "==> Unity:   $UNITY_EXE"
echo "==> project: $PROJECT_WIN"
echo "==> cleaning Builds/ for a fresh output"
rm -rf "${GAME_PROJECT_DIR}/Builds"

echo "==> building (headless; this can take a few minutes)..."
set +e
"$UNITY_EXE" \
  -batchmode \
  -quit \
  -projectPath "$PROJECT_WIN" \
  -executeMethod BuildScript.BuildWindows \
  -logFile "$(cd "$GAME_PROJECT_DIR" && pwd -W)/Logs/build.log"
UNITY_RC=$?
set -e

if [[ $UNITY_RC -ne 0 || ! -f "$EXE_OUT" ]]; then
  echo "error: Unity build failed (exit $UNITY_RC). Last 40 log lines:" >&2
  [[ -f "$LOG_FILE" ]] && tail -n 40 "$LOG_FILE" >&2
  exit 1
fi

echo "==> build OK: $EXE_OUT"
echo "    $(date -r "$EXE_OUT" '+built %Y-%m-%d %H:%M:%S')"
