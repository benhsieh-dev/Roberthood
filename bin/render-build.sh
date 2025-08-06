#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
bundle install

# Install Node.js dependencies
npm install

# Precompile assets
bundle exec rails assets:precompile

# Clean assets
bundle exec rails assets:clean

# Migrate database
bundle exec rails db:migrate