# Glypher Rails example

This example shows the intended host-app wiring for `gems/glypher_rails`. It is documented as integration snippets because the Rails adapter lives as a gem inside this monorepo rather than as a full generated application.

## Gemfile

```ruby
gem "glypher_rails", path: "../../gems/glypher_rails"
```

Install the frontend packages used by the gem boot script:

```bash
yarn add @glypher/react @glypher/starter-kit @glypher/full-kit @glypher/theme-default react react-dom
```

## Install

```bash
bin/rails generate glypher:install
```

For ActiveStorage-backed uploads:

```ruby
# config/routes.rb
mount Glypher::Rails::Engine => "/glypher"
```

```ruby
# config/initializers/glypher.rb
Glypher.configure do |config|
  config.uploads = :active_storage
  config.upload_path = "/glypher/uploads"
  config.default_kit = "full"
  config.sanitize_output = true
end
```

## JavaScript entrypoint

```js
// app/javascript/application.js
import "glypher_rails/glypher";
```

## Form usage

```erb
<%= form_with model: @article do |form| %>
  <%= form.glypher_editor :content, kit: "full", placeholder: "Write…" %>
  <%= form.submit %>
<% end %>
```

## Rendering saved content

```erb
<%= glypher_render(@article.content) %>
```

The renderer sanitizes stored HTML by default and preserves the formatting emitted by Glypher, including table structure, images, alignment and color-related inline styles.
