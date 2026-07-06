# glypher_rails

Rails integration for the [Glypher](../../) rich-text editor.

This gem is a **thin adapter**. The editor is the upstream npm
packages (`@glypher/react`, `@glypher/starter-kit`, …); the gem
adds a form helper, a safe server-side renderer, and an optional
upload endpoint. It holds no schema, no commands, no rendering
pipeline of its own — see `PLAN.md` for the architectural rules.

## Install

```ruby
# Gemfile
gem "glypher_rails"
```

```bash
bundle install
yarn add @glypher/react @glypher/starter-kit \
         @glypher/full-kit @glypher/theme-default
```

Generate the initializer:

```bash
bin/rails generate glypher:install
```

Mount the engine if you want the upload endpoint:

```ruby
# config/routes.rb
mount Glypher::Rails::Engine => "/glypher"
```

Import the boot script from your JS entrypoint:

```js
// app/javascript/application.js
import "glypher_rails/glypher";
```

## Configure

```ruby
# config/initializers/glypher.rb
Glypher.configure do |c|
  c.uploads         = :active_storage   # or :none (default)
  c.sanitize_output = true
  c.default_kit     = "starter"         # or "full"
  c.upload_path     = "/glypher/uploads"
  c.allowed_tags    = %w[p h1 h2 h3 strong em a img]
end
```

## Use

The form helper mounts an editor and persists its HTML through a
hidden field — a normal form submit saves the content:

```erb
<%= form_with model: @article do |form| %>
  <%= form.glypher_editor :content %>
  <%= form.submit %>
<% end %>
```

Display saved content on a public page — always sanitized:

```erb
<%= glypher_render(@article.content) %>
```

## How it works

`glypher_editor` renders a hidden field (seeded with the stored
HTML) and an empty mount point. The boot script (`glypher.js`)
finds each mount, attaches a real editor from the npm packages, and
writes `editor.getHTML()` back into the hidden field on every change.
The model attribute is a plain HTML string — Glypher's transport
format — so no special column type or serializer is needed.

## Uploads

With `config.uploads = :active_storage`, the engine exposes
`POST /glypher/uploads`. It stores image files via ActiveStorage and
responds with `{ src, alt, title }` for the editor to embed. Subclass
`Glypher::UploadsController` to add authentication.

With `:none`, no endpoint is mounted — wire your own.

## Status

`0.1.0` — form helper, renderer, sanitizer, and upload endpoint
implemented. Ships after the npm packages reach a stable release.
