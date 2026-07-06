module Glypher
  module Rails
    # View helper that mounts a Glypher editor inside a Rails form.
    #
    #   <%= form.glypher_editor :content %>      # via FormBuilder
    #   <%= glypher_editor(form, :content) %>    # standalone
    #
    # Emits a hidden field carrying the document HTML plus an empty
    # mount point. The boot script (glypher.js) finds the mount,
    # attaches a real editor seeded from the hidden field, and writes
    # editor.getHTML() back into that field on every change — so a
    # normal form submit persists the content with no extra wiring.
    module FormHelper
      # form    - a Rails FormBuilder
      # method  - the model attribute (stored as an HTML string)
      # options - :kit ("starter" | "full"), :class, :placeholder, :upload_url
      def glypher_editor(form, method, options = {})
        object = form.object
        current = object.respond_to?(method) ? object.public_send(method) : nil
        kit = (options[:kit] || Glypher.config.default_kit).to_s
        upload_url = options.fetch(:upload_url, glypher_upload_url)

        hidden = form.hidden_field(
          method,
          value: current.to_s,
          data: { glypher_input: true },
        )

        mount = content_tag(
          :div,
          "",
          class: "glypher-mount",
          data: {
            glypher: true,
            glypher_kit: kit,
            glypher_placeholder: options[:placeholder],
            glypher_upload_url: upload_url,
          },
        )

        wrapper_class = ["glypher-field", options[:class]].compact.join(" ")
        content_tag(:div, safe_join([hidden, mount]), class: wrapper_class)
      end

      private

      def glypher_upload_url
        if Glypher.config.uploads == :active_storage
          Glypher.config.upload_path
        end
      end
    end

    # Mixed into ActionView::Helpers::FormBuilder so `form.glypher_editor`
    # works alongside the standalone helper.
    module FormBuilderExtension
      def glypher_editor(method, options = {})
        @template.glypher_editor(self, method, options)
      end
    end
  end
end
