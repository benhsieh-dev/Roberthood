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

# Note: Database migrations are handled separately by Render during deployment