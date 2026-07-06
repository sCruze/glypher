require "rails/generators"

module Glypher
  module Generators
    class InstallGenerator < ::Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      desc "Install Glypher Rails configuration"

      def copy_initializer
        template "initializer.rb", "config/initializers/glypher.rb"
      end

      def show_routes_hint
        say "Mount Glypher::Rails::Engine at /glypher when ActiveStorage uploads are enabled."
      end
    end
  end
end
