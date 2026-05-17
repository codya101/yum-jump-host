#!/usr/bin/env bash
# ---------------------------------------------------------------
# Package the Unity Windows build into a single downloadable ZIP
# that the site serves at /downloads/Yum-Jump-Demo-Windows.zip.
#
# Usage:
#   npm run package:demo
#
# The ZIP is written into public/, which Vite copies verbatim into
# dist/ on `npm run build`. So the normal `npm run deploy` then
# uploads it with no extra steps -- one deploy mechanism.
#
# Override the source build dir if needed:
#   GAME_BUILD_DIR="/path/to/Builds" npm run package:demo
# ---------------------------------------------------------------

set -euo pipefail

# Run from the repo root regardless of where this is invoked.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Default: the Unity build sits in the sibling "Yum Jump" project.
GAME_BUILD_DIR="${GAME_BUILD_DIR:-../Yum Jump/Builds}"

# Folder name users see after extracting, and the output zip name.
ZIP_ROOT_NAME="Yum Jump"
OUT_DIR="public/downloads"
OUT_ZIP="${OUT_DIR}/Yum-Jump-Demo-Windows.zip"

if [[ ! -d "$GAME_BUILD_DIR" ]]; then
  echo "error: game build dir not found: $GAME_BUILD_DIR" >&2
  echo "       set GAME_BUILD_DIR to the folder containing 'Yum Jump.exe'." >&2
  exit 1
fi
if [[ ! -f "${GAME_BUILD_DIR}/Yum Jump.exe" ]]; then
  echo "error: 'Yum Jump.exe' not found in: $GAME_BUILD_DIR" >&2
  echo "       produce a Windows build in Unity first (File > Build)." >&2
  exit 1
fi

command -v 7z >/dev/null 2>&1 || { echo "error: 7z not found on PATH." >&2; exit 1; }

mkdir -p "$OUT_DIR"
rm -f "$OUT_ZIP"

# Stage the build under a single top-level folder so the zip extracts
# cleanly to "Yum Jump/..." instead of spraying loose files. Exclude
# Unity's *_BurstDebugInformation_DoNotShip (debug data, not for release).
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
mkdir -p "${STAGE}/${ZIP_ROOT_NAME}"

echo "==> staging build from: $GAME_BUILD_DIR"
# Copy everything except the DoNotShip burst-debug folder.
( cd "$GAME_BUILD_DIR" && \
  find . -mindepth 1 -maxdepth 1 ! -name '*_BurstDebugInformation_DoNotShip' \
    -exec cp -r {} "${STAGE}/${ZIP_ROOT_NAME}/" \; )

echo "==> compressing -> $OUT_ZIP"
( cd "$STAGE" && 7z a -tzip -mx=7 -bso0 -bsp0 "demo.zip" "${ZIP_ROOT_NAME}" >/dev/null )
mv "${STAGE}/demo.zip" "$OUT_ZIP"

SIZE="$(du -h "$OUT_ZIP" | cut -f1)"
echo "==> done: $OUT_ZIP (${SIZE})"
echo "    It will be deployed by 'npm run deploy' (Vite copies public/ -> dist/)."
