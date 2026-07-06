# glypher_rails — thin Rails adapter for the Glypher editor.
#
# Loading order: version and config have no Rails dependency and load
# first; the rest require Rails and are pulled in by the engine.

require "glypher/rails/version"
require "glypher/rails/config"

require "glypher/rails/sanitizer"
require "glypher/rails/form_helper"
require "glypher/rails/renderer"
require "glypher/rails/uploads"

# The engine require is last — it pulls in Rails. In a non-Rails
# context (e.g. unit-testing the sanitizer) the rescue keeps the gem
# loadable without the framework present.
begin
  require "glypher/rails/engine"
rescue LoadError
  # Rails not available — engine features are simply unavailable.
end

module Glypher
  module Rails
    class Error < StandardError; end
  end
end
