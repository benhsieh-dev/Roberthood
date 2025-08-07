#!/usr/bin/env bash
# exit on error
set -o errexit

echo "==> Starting custom build process"
echo "==> Ruby version: $(ruby -v)"

# Install Ruby dependencies
echo "==> Installing Ruby gems"
bundle config set frozen false
bundle install

# Install Node.js dependencies  
echo "==> Installing Node.js packages"
npm install

# Build production assets with webpack
echo "==> Building production assets with webpack"
NODE_ENV=production npm run build

# Precompile Rails assets
echo "==> Precompiling Rails assets"
RAILS_ENV=production bundle exec rails assets:precompile

# Clean old assets
echo "==> Cleaning old assets"
RAILS_ENV=production bundle exec rails assets:clean

# Migrate database
echo "==> Running database migrations"
RAILS_ENV=production bundle exec rails db:migrate

echo "==> Build process completed successfully"