require_relative "lib/glypher/rails/version"

Gem::Specification.new do |spec|
  spec.name          = "glypher_rails"
  spec.version       = Glypher::Rails::VERSION
  spec.authors       = ["Glypher contributors"]
  spec.summary       = "Rails integration for the Glypher rich text editor."
  spec.description   = <<~DESC
    Thin Rails adapter for Glypher. Provides a form helper, a safe
    server-side renderer, and an optional ActiveStorage-backed upload
    endpoint. The editor itself is the upstream npm packages — this gem
    never replaces or duplicates them.
  DESC
  spec.license       = "MIT"
  spec.required_ruby_version = ">= 3.0"

  spec.files = Dir[
    "lib/**/*",
    "app/**/*",
    "config/**/*",
    "PLAN.md",
    "README.md",
  ]
  spec.require_paths = ["lib"]

  spec.add_dependency "rails", ">= 7.0"

  spec.add_development_dependency "rspec", "~> 3.13"
  spec.add_development_dependency "rails-html-sanitizer", ">= 1.6"

  spec.metadata["status"]            = "released"
  spec.metadata["rubygems_mfa_required"] = "true"
end
