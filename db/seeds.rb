# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# Create demo user for the application
demo_user = User.find_or_create_by(username: "bqh5026") do |user|
  user.password = "password"
  user.first_name = "Demo"
  user.last_name = "User"
end

puts "Demo user created/updated: #{demo_user.username}"
