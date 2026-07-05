#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANIMATION_DIR="$ROOT_DIR/open-animation"
TARGET_DIR="$ROOT_DIR/animation"

echo "🔨 Building animation..."
cd "$ANIMATION_DIR"
pnpm build

echo ""
echo "📦 Deploying to $TARGET_DIR"
mkdir -p "$TARGET_DIR"
cp -r dist/* "$TARGET_DIR"

echo ""
echo "✅ Done! Files deployed:"
ls -la "$TARGET_DIR"
echo ""
echo "📍 Open $ROOT_DIR/index.html in your browser to test."
