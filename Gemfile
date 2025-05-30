source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.7' # ✅ Updated from 2.7.6 to a Render-compatible Ruby version

# gem 'rails', '~> 5.2.4', '>= 5.2.4.1'
gem 'rails', '~> 6.1.7'  # Current stable 6.x version

gem 'pg', '>= 0.18', '< 2.0'

# ✅ Updated Puma to be compatible with Ruby 3.x
gem 'puma', '~> 5.6'

gem 'sass-rails', '~> 5.0'
gem 'sassc'

gem 'uglifier', '>= 1.3.0'

gem 'coffee-rails', '~> 4.2'
gem 'jbuilder', '~> 2.5'
gem 'bcrypt', '~> 3.1.7'

gem 'bootsnap', '>= 1.1.0', require: false

# ✅ Still works, but Webpacker 5.4 is the last stable version for Rails 5
gem 'webpacker', '~> 5.4'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'annotate'
  gem 'pry-rails'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'

  gem 'webdrivers'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'jquery-rails'
gem 'font-awesome-sass', '~> 5.12.0'
gem 'iex-ruby-client'
gem 'dotenv-rails', groups: [:development, :test]
