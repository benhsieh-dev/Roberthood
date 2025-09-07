#!/usr/bin/env bash
# Post-build release script for Firebase-only setup
set -o errexit

echo "==> Starting release process"

echo "==> Using Firebase for data storage - no database migrations needed"

echo "==> Release process completed successfully"