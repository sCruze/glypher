# frozen_string_literal: true

Dummy::Application.routes.draw do
  mount Glypher::Rails::Engine => "/glypher"
end
