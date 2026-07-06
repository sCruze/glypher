# frozen_string_literal: true

require "spec_helper"

RSpec.describe Glypher::Rails::RenderHelper do
  # A minimal view context: the Rails tag helpers plus the gem's.
  let(:view) do
    Class.new do
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::OutputSafetyHelper
      include Glypher::Rails::RenderHelper
    end.new
  end

  describe "#glypher_render" do
    it "wraps the content in a glypher-content container" do
      html = view.glypher_render("<p>hello</p>")
      expect(html).to include('class="glypher-content"')
      expect(html).to include("hello")
    end

    it "sanitizes the content by default" do
      html = view.glypher_render("<p>ok</p><script>evil()</script>")
      expect(html).not_to include("script")
      expect(html).to include("ok")
    end

    it "skips sanitizing when configured off" do
      Glypher.configure { |c| c.sanitize_output = false }
      html = view.glypher_render("<p>raw &amp; trusted</p>")
      expect(html).to include("raw")
    end

    it "appends an extra wrapper class" do
      html = view.glypher_render("<p>x</p>", html_class: "prose")
      expect(html).to include("glypher-content prose")
    end

    it "returns an html_safe string" do
      html = view.glypher_render("<p>x</p>")
      expect(html).to be_html_safe
    end

    it "treats nil content as empty" do
      html = view.glypher_render(nil)
      expect(html).to include('class="glypher-content"')
    end
  end
end
