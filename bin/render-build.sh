#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Ruby dependencies
bundle install

# Install Node.js dependencies
npm install

# Build production assets with webpack
NODE_ENV=production npm run build

# Precompile Rails assets
RAILS_ENV=production bundle exec rails assets:precompile

# Clean old assets
RAILS_ENV=production bundle exec rails assets:clean

# Migrate database
RAILS_ENV=production bundle exec rails db:migrate