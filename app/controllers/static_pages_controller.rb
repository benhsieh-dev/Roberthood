class StaticPagesController < ApplicationController
  def root
  end

  def setup_demo
    begin
      demo_user = User.find_or_create_by(username: "bqh5026") do |user|
        user.password = "password"
        user.first_name = "Demo"
        user.last_name = "User"
      end
      
      if demo_user.persisted?
        render plain: "Demo user successfully created/updated: #{demo_user.username}. You can now use the Demo User login button. Please remove this endpoint after use."
      else
        render plain: "Error creating demo user: #{demo_user.errors.full_messages.join(', ')}", status: 500
      end
    rescue => e
      render plain: "Error: #{e.message}", status: 500
    end
  end
end