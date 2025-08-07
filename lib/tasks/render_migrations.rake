# Override db:migrate for Render deployments to handle connection issues gracefully

if Rails.env.production?
  namespace :db do
    desc "Render-safe database migration"
    task :migrate => :environment do
      puts "=== USING CUSTOM RENDER MIGRATION TASK ==="
      begin
        puts "Testing database connection..."
        
        # Test if DATABASE_URL is available and working
        if ENV['DATABASE_URL'].present?
          ActiveRecord::Base.connection.execute('SELECT 1')
          puts "Database connection successful, proceeding with migrations..."
          
          # Run migrations using ActiveRecord directly
          ActiveRecord::Base.connection.migration_context.migrate
          puts "Migrations completed successfully"
        else
          puts "DATABASE_URL not available - skipping migrations"
          exit 0
        end
        
      rescue ActiveRecord::ConnectionNotEstablished, PG::ConnectionBad => e
        puts "=== DATABASE CONNECTION FAILED ==="
        puts "This is expected during Render build phase"
        puts "Migrations will be handled during deployment phase"
        puts "Error: #{e.message}"
        puts "===================================="
        
        # Check if we're in build phase vs deploy phase
        if ENV['RENDER_SERVICE_TYPE'] == 'web'
          puts "In deployment phase - this is unexpected"
          exit 1
        else
          puts "In build phase - exiting successfully"
          exit 0
        end
      rescue => e
        puts "Unexpected error during migration: #{e.message}"
        puts e.backtrace.first(5).join("\n")
        exit 1
      end
    end
  end
  
  # Remove the default migrate task and replace with our custom one
  Rake::Task['db:migrate'].clear if Rake::Task.task_defined?('db:migrate')
end