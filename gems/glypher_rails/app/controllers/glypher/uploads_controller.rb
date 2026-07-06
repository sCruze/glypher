module Glypher
  # Default upload controller. A host app can use this as-is (the
  # engine routes POST /glypher/uploads to it) or subclass it to add
  # authentication.
  class UploadsController < ::ActionController::Base
    include Glypher::Rails::Uploads

    protect_from_forgery with: :null_session
  end
end
