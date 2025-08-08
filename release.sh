#!/usr/bin/env bash
# Post-build release script for database setup
set -o errexit

echo "==> Starting release process"

# Ensure database is set up
echo "==> Setting up database (if needed)"
RAILS_ENV=production bundle exec rails db:migrate
RAILS_ENV=production bundle exec rails db:seed

echo "==> Release process completed successfully"