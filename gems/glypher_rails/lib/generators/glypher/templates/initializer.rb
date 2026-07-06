# frozen_string_literal: true

Glypher.configure do |config|
  # Use :active_storage after mounting the engine and installing ActiveStorage.
  config.uploads = :none

  # Used by the JavaScript adapter when uploads are enabled.
  config.upload_path = "/glypher/uploads"

  # "starter" gives the MVP toolbar; "full" enables the larger extension set.
  config.default_kit = "starter"

  # Stored editor HTML is sanitized before public rendering.
  config.sanitize_output = true
end
