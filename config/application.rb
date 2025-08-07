require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Robinhood
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    # config.load_defaults 5.2
    config.load_defaults 6.1


    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    
    # Override rake tasks to handle Render deployment gracefully
    config.after_initialize do
      if Rails.env.production? && defined?(Rake)
        # Override db:migrate to handle connection issues during Render build
        Rake::Task.define_task('db:migrate' => :environment) do
          puts "=== CUSTOM MIGRATION TASK ACTIVE ==="
          begin
            if ENV['DATABASE_URL'].blank?
              puts "No DATABASE_URL - skipping migrations (build phase)"
              next
            end
            
            ActiveRecord::Base.connection.execute('SELECT 1')
            puts "Database available - running migrations"
            ActiveRecord::MigrationContext.new(
              ActiveRecord::Base.connection.migration_context.migrations_paths,
              ActiveRecord::Base.connection.schema_migration
            ).migrate
            puts "Migrations completed successfully"
            
          rescue ActiveRecord::ConnectionNotEstablished, PG::ConnectionBad => e
            puts "Database connection failed during build - this is expected"
            puts "Error: #{e.message}"
            puts "Exiting successfully to allow build to continue"
          rescue => e
            puts "Unexpected migration error: #{e.class} - #{e.message}"
            raise e
          end
        end
      end
    end
  end
end
