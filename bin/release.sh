#!/usr/bin/env bash
# Render release script - runs after build but before deployment

echo "Running release script..."

# Wait a moment for database to be fully available
sleep 5

# Check if database is available before running migrations
if RAILS_ENV=production bundle exec rails runner "ActiveRecord::Base.connection.execute('SELECT 1')" 2>/dev/null; then
  echo "Database is available, running migrations..."
  RAILS_ENV=production bundle exec rails db:migrate
else
  echo "Database is not yet available - skipping migrations"
  exit 0
fi

echo "Release script completed successfully"