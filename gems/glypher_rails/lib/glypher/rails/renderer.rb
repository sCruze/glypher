module Glypher
  module Rails
    # View helper for displaying saved content on a public page.
    #
    #   <%= glypher_render(@article.content) %>
    #
    # The stored value is editor HTML. It is sanitized (unless
    # config.sanitize_output is false) and wrapped in a container that
    # the default theme styles.
    module RenderHelper
      # content      - stored editor HTML
      # allowed_tags - override the configured tag allow-list
      # html_class   - extra CSS class on the wrapper
      def glypher_render(content, allowed_tags: nil, html_class: nil)
        html = content.to_s
        if Glypher.config.sanitize_output
          html = Glypher::Rails::Sanitizer.sanitize(
            html, allowed_tags: allowed_tags
          )
        end
        wrapper = ["glypher-content", html_class].compact.join(" ")
        content_tag(:div, html.html_safe, class: wrapper)
      end
    end
  end
end
