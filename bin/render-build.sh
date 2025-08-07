#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Ruby dependencies
bundle install

# Install Node.js dependencies
npm install

# Skip webpack build since Rails asset precompilation handles everything
# Build production assets with webpack (use legacy OpenSSL for Node.js 18 compatibility)
# NODE_ENV=production NODE_OPTIONS=--openssl-legacy-provider npm run build

# Precompile Rails assets (this includes webpack via webpacker)
RAILS_ENV=production bundle exec rails assets:precompile

# Clean old assets
RAILS_ENV=production bundle exec rails assets:clean

# Check if database is available and run migrations if it is
echo "Checking database availability..."
echo "DATABASE_URL: ${DATABASE_URL:-"NOT SET"}"

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL not set during build phase - skipping migrations"
elif RAILS_ENV=production bundle exec rails runner "ActiveRecord::Base.connection.execute('SELECT 1')" 2>/dev/null; then
  echo "Database is available, running migrations..."
  RAILS_ENV=production bundle exec rails db:migrate
else
  echo "Database URL is set but connection failed - migrations will be handled by Render deployment"
fi