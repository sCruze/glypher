module Glypher
  # Gem-wide configuration, set in an initializer:
  #
  #   Glypher.configure do |c|
  #     c.uploads = :active_storage
  #     c.allowed_tags = %w[p h1 h2 strong em a]
  #   end
  #
  class Config
    # :none (default) or :active_storage — whether the gem mounts an
    # upload endpoint.
    attr_accessor :uploads
    # When true, glypher_render sanitizes content before display.
    attr_accessor :sanitize_output
    # Tag allow-list for the server-side renderer.
    attr_accessor :allowed_tags
    # Which bundle the form helper boots: "starter" or "full".
    attr_accessor :default_kit
    # Upload endpoint used by the JavaScript adapter when uploads are enabled.
    attr_accessor :upload_path

    def initialize
      @uploads = :none
      @sanitize_output = true
      @allowed_tags = %w[
        p br h1 h2 h3 h4 h5 h6 strong em u s code pre blockquote
        ul ol li a img figure figcaption hr span
        table thead tbody tr td th
      ]
      @default_kit = "starter"
      @upload_path = "/glypher/uploads"
    end
  end

  class << self
    # Yields the config for editing and exposes the same object to callers.
    def configure
      yield(config) if block_given?
      config
    end

    def config
      @config ||= Config.new
    end
  end
end
