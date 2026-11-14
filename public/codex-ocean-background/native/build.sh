#!/bin/zsh
set -euo pipefail
ROOT="${0:A:h:h}"
APP="$HOME/Applications/Codex Ocean Overlay.app"
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources/web"
swiftc "$ROOT/native/CodexOceanOverlay.swift" -o "$APP/Contents/MacOS/CodexOceanOverlay" -framework Cocoa -framework WebKit -framework CoreGraphics
cp "$ROOT/native/Info.plist" "$APP/Contents/Info.plist"
cp "$ROOT/index.html" "$ROOT/style.css" "$ROOT/app.js" "$APP/Contents/Resources/web/"
mkdir -p "$APP/Contents/Resources/web/assets/backgrounds" "$APP/Contents/Resources/web/assets/encounters"
cp "$ROOT"/assets/backgrounds/*.mp4 "$APP/Contents/Resources/web/assets/backgrounds/"
cp "$ROOT"/assets/encounters/*.mp4 "$APP/Contents/Resources/web/assets/encounters/"
cp "$ROOT/assets/manifest.json" "$ROOT/assets/授权与来源清单.csv" "$APP/Contents/Resources/web/assets/"
codesign --force --deep --sign - "$APP"
echo "$APP"
