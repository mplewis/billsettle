source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1'

gem 'puma', '~> 3.7'
gem 'sqlite3'

gem 'bootstrap', '~> 4.0.0.beta'
gem 'bootstrap_form', github: 'bootstrap-ruby/rails-bootstrap-forms', branch: 'bootstrap-v4'
gem 'devise-bootstrap-views', github: 'hisea/devise-bootstrap-views', branch: 'bootstrap4'
gem 'sass-rails', '~> 5.0'
gem 'slim-rails', '~> 3.1'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3'

gem 'devise', '~> 4.3'
gem 'monetize', '~> 1.7'

group :development, :test do
  gem 'capybara', '~> 2.13'
  gem 'faker', '~> 1.8'
  gem 'factory_girl_rails', '~> 4.8'
  gem 'rspec-rails', '~> 3'
  gem 'selenium-webdriver'
end

group :test do
  gem 'rspec_junit_formatter'
end

group :development do
  gem 'awesome_print'
  gem 'annotate', '~> 2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0'
end
