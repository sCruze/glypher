module Glypher
  module Rails
    # Controller concern backing the image uploader.
    #
    #   class Glypher::UploadsController < ApplicationController
    #     include Glypher::Rails::Uploads
    #   end
    #
    # The JS side posts a `file` param; the controller stores it via
    # ActiveStorage and responds with image attributes for the editor.
    #
    # Active only when config.uploads == :active_storage — otherwise
    # the endpoint responds with 404 and the host wires its own upload.
    module Uploads
      def create
        if Glypher.config.uploads != :active_storage
          render json: { error: "uploads disabled" }, status: :not_found
        elsif !active_storage_available?
          render json: { error: "active storage unavailable" }, status: :unprocessable_entity
        elsif upload_file.nil?
          render json: { error: "no file" }, status: :unprocessable_entity
        elsif !image_upload?(upload_file)
          render json: { error: "unsupported file type" }, status: :unprocessable_entity
        else
          blob = ActiveStorage::Blob.create_and_upload!(
            io: upload_file.to_io,
            filename: upload_file.original_filename,
            content_type: upload_file.content_type,
          )

          render json: image_payload(blob, upload_file)
        end
      end

      private

      def upload_file
        params[:file]
      end

      def active_storage_available?
        defined?(::ActiveStorage::Blob)
      end

      def image_upload?(file)
        file.respond_to?(:content_type) && file.content_type.to_s.start_with?("image/")
      end

      def image_payload(blob, file)
        {
          src: blob_path(blob),
          alt: File.basename(file.original_filename.to_s, ".*"),
          title: file.original_filename.to_s,
        }
      end

      # only_path keeps it host-agnostic — the editor embeds a relative URL.
      def blob_path(blob)
        ::Rails.application.routes.url_helpers.rails_blob_path(
          blob, only_path: true
        )
      end
    end
  end
end
