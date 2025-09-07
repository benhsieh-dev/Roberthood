# Disable database migrations for Firebase-only setup
if Rails.env.production?
  # Override migration tasks to be no-ops
  Rails.application.config.active_record.maintain_test_schema = false
  Rails.application.config.active_record.dump_schema_after_migration = false
  
  # Disable automatic schema dumping
  Rails.application.config.active_record.schema_format = :ruby
  
  # Override db:migrate task
  Rake::Task.define_task('db:migrate') do
    puts "Using Firebase for data storage - skipping migrations"
  end
  
  Rake::Task.define_task('db:seed') do  
    puts "Using Firebase for data storage - skipping seeds"
  end
end