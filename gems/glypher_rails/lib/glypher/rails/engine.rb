require "rails/engine"

module Glypher
  module Rails
    # Rails::Engine subclass — the gem's plumbing.
    #
    # It does three things and nothing more (per PLAN.md the gem stays
    # a thin adapter):
    #   1. Isolates the Glypher namespace so routes / controllers
    #      don't collide with the host app.
    #   2. Mixes the view helpers into ActionView.
    #   3. Adds glypher_editor to the form builder.
    #
    # The upload route lives in config/routes.rb and is mounted by the
    # host with `mount Glypher::Rails::Engine => "/glypher"`.
    class Engine < ::Rails::Engine
      isolate_namespace Glypher

      initializer "glypher.view_helpers" do
        ActiveSupport.on_load(:action_view) do
          include Glypher::Rails::FormHelper
          include Glypher::Rails::RenderHelper
        end
      end

      initializer "glypher.form_builder" do
        ActiveSupport.on_load(:action_view) do
          ActionView::Helpers::FormBuilder.include(
            Glypher::Rails::FormBuilderExtension
          )
        end
      end
    end
  end
end
