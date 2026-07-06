# frozen_string_literal: true

require "spec_helper"

RSpec.describe Glypher::Rails do
  it "has a version number" do
    expect(Glypher::Rails::VERSION).not_to be_nil
  end

  it "uses a SemVer-shaped version string" do
    expect(Glypher::Rails::VERSION).to match(/\A\d+\.\d+\.\d+/)
  end
end
