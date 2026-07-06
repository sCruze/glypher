# Mounted by Glypher::Rails::Engine. Provides the single upload
# endpoint; only reachable when config.uploads == :active_storage.
Glypher::Rails::Engine.routes.draw do
  post "/uploads", to: "uploads#create", as: :uploads
end
