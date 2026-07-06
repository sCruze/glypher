# frozen_string_literal: true

require "rails"
require "action_controller/railtie"
require "action_view/railtie"
require "active_storage/engine"
require "glypher_rails"

module Dummy
  class Application < Rails::Application
    config.root = File.expand_path("..", __dir__)
    config.eager_load = false
    config.secret_key_base = "test"
    config.hosts.clear
  end
end
