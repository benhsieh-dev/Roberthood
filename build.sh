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

# Setup database (migrate and seed)
echo "==> Setting up database"
if RAILS_ENV=production bundle exec rails runner "ActiveRecord::Base.connection.execute('SELECT 1')" 2>/dev/null; then
  echo "Database is available, running setup..."
  
  echo "Creating database (if needed)..."
  RAILS_ENV=production bundle exec rails db:create
  
  echo "Running database migrations..."
  RAILS_ENV=production bundle exec rails db:migrate
  echo "Migrations completed successfully"
  
  echo "Running database seeds..."
  RAILS_ENV=production bundle exec rails db:seed
  echo "Database setup completed successfully"
else
  echo "Database not available during build phase - will try to set up at runtime"
  echo "This is normal for some deployment platforms"
fi

echo "==> Build process completed successfully"