# frozen_string_literal: true

# RSpec suite for glypher_rails.
#
# Run from the gem directory with a Ruby toolchain installed:
#
#   bundle install
#   bundle exec rspec
#
# The suite loads ActionView and the Rails HTML sanitizer — the real
# dependencies the gem wraps — so the sanitizer and the view helpers
# are exercised against genuine Rails behaviour, not stubs.

require "glypher_rails"
require "action_view"
require "action_controller"
require "rails-html-sanitizer"

RSpec.configure do |config|
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end
  config.disable_monkey_patching!
  config.order = :random
  Kernel.srand config.seed

  # Each example starts from a fresh, default configuration.
  config.before do
    Glypher.instance_variable_set(:@config, nil)
  end
end
