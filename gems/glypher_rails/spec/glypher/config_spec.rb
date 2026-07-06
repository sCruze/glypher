# frozen_string_literal: true

require "spec_helper"

RSpec.describe Glypher::Config do
  describe "defaults" do
    it "leaves uploads off" do
      expect(Glypher.config.uploads).to eq(:none)
    end

    it "sanitizes output" do
      expect(Glypher.config.sanitize_output).to be(true)
    end

    it "boots the starter kit" do
      expect(Glypher.config.default_kit).to eq("starter")
    end

    it "allows the common content tags" do
      tags = Glypher.config.allowed_tags
      expect(tags).to include("p", "h1", "strong", "a", "table", "li")
    end

    it "does not allow script in the tag list" do
      expect(Glypher.config.allowed_tags).not_to include("script")
    end
  end

  describe ".configure" do
    it "yields the config for editing" do
      Glypher.configure do |c|
        c.default_kit = "full"
        c.uploads = :active_storage
      end
      expect(Glypher.config.default_kit).to eq("full")
      expect(Glypher.config.uploads).to eq(:active_storage)
    end

    it "returns the config object" do
      expect(Glypher.configure).to be_a(Glypher::Config)
    end

    it "is a no-op without a block" do
      expect { Glypher.configure }.not_to raise_error
    end
  end

  describe ".config" do
    it "memoizes a single instance" do
      expect(Glypher.config).to equal(Glypher.config)
    end
  end
end
