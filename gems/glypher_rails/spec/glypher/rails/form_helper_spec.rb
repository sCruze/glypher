# frozen_string_literal: true

require "spec_helper"

RSpec.describe Glypher::Rails::FormHelper do
  # A plain object standing in for an ActiveRecord model.
  let(:model) do
    Struct.new(:content) do
      def self.model_name
        ActiveModel::Name.new(self, nil, "Article")
      end
    end.new("<p>saved content</p>")
  end

  # A view context with the Rails form helpers plus the gem's.
  let(:view) do
    Class.new do
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::FormHelper
      include ActionView::Helpers::FormTagHelper
      include ActionView::Helpers::OutputSafetyHelper
      include Glypher::Rails::FormHelper
    end.new
  end

  let(:form) do
    ActionView::Helpers::FormBuilder.new(:article, model, view, {})
  end

  describe "#glypher_editor" do
    it "emits a hidden field seeded with the current value" do
      html = view.glypher_editor(form, :content)
      expect(html).to include('type="hidden"')
      expect(html).to include("saved content")
    end

    it "marks the hidden field as the Glypher input" do
      html = view.glypher_editor(form, :content)
      expect(html).to include("data-glypher-input")
    end

    it "emits a mount point for the editor" do
      html = view.glypher_editor(form, :content)
      expect(html).to include("glypher-mount")
      expect(html).to include("data-glypher")
    end

    it "boots the configured default kit" do
      html = view.glypher_editor(form, :content)
      expect(html).to include('data-glypher-kit="starter"')
    end

    it "accepts a kit override" do
      html = view.glypher_editor(form, :content, kit: "full")
      expect(html).to include('data-glypher-kit="full"')
    end

    it "carries a placeholder through to the mount" do
      html = view.glypher_editor(form, :content, placeholder: "Write…")
      expect(html).to include("Write")
    end

    it "adds the configured upload URL when uploads are enabled" do
      Glypher.configure do |c|
        c.uploads = :active_storage
        c.upload_path = "/glypher/uploads"
      end
      html = view.glypher_editor(form, :content)
      expect(html).to include('data-glypher-upload-url="/glypher/uploads"')
    end

    it "applies an extra field class" do
      html = view.glypher_editor(form, :content, class: "tall")
      expect(html).to include("glypher-field tall")
    end
  end

  describe "the FormBuilder extension" do
    it "exposes glypher_editor on the builder" do
      expect(form).to respond_to(:glypher_editor)
    end
  end
end
