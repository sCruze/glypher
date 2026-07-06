/**
 * glypher.js — the gem's boot script.
 *
 * The form helper renders, for each editor field:
 *
 *   <div class="glypher-field">
 *     <input type="hidden" data-glypher-input value="<saved html>">
 *     <div class="glypher-mount" data-glypher data-glypher-kit="…">
 *   </div>
 *
 * This script finds every mount, attaches a real editor seeded from
 * the hidden field, and writes editor.getHTML() back into that field
 * on every change — so a plain form submit persists the content.
 *
 * The editor itself is the upstream npm packages. The gem ships no
 * editor core; it only wires Rails forms, assets and optional uploads.
 */

import { createRoot } from "react-dom/client";
import { createElement, useMemo } from "react";
import {
  useEditor,
  EditorProvider,
  EditorContent,
  Toolbar,
} from "@glypher/react";
import { StarterKit, ImageExtension } from "@glypher/starter-kit";
import { FullKit } from "@glypher/full-kit";
import "@glypher/theme-default/index.css";

function csrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : null;
}

function uploadHandler(uploadUrl) {
  if (!uploadUrl) return undefined;

  return async (file) => {
    const body = new FormData();
    body.append("file", file);

    const headers = {};
    const token = csrfToken();
    if (token) headers["X-CSRF-Token"] = token;

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers,
      body,
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error(`Glypher upload failed with ${response.status}`);
    }

    return response.json();
  };
}

function kitExtensions(kit, uploadUrl) {
  const base = kit === "full" ? FullKit.extensions : StarterKit.extensions;
  const upload = uploadHandler(uploadUrl);

  if (!upload) return base;

  return base.map((extension) => {
    if (extension.name !== "image") return extension;
    return ImageExtension.configure({ upload });
  });
}

/** One mounted editor field. */
function GlypherField({ mount, input }) {
  const kit = mount.dataset.glypherKit === "full" ? "full" : "starter";
  const uploadUrl = mount.dataset.glypherUploadUrl || "";

  const { editor } = useEditor({
    extensions: useMemo(() => kitExtensions(kit, uploadUrl), [kit, uploadUrl]),
    content: input.value || "<p></p>",
    onUpdate: ({ editor }) => {
      input.value = editor.getHTML();
    },
  });

  return createElement(
    EditorProvider,
    { editor },
    createElement(Toolbar, null),
    createElement(EditorContent, null),
  );
}

/** Attach editors to every un-booted mount in the document. */
export function boot(root = document) {
  const mounts = root.querySelectorAll("[data-glypher]");
  mounts.forEach((mount) => {
    if (mount.dataset.glypherBooted) return;
    mount.dataset.glypherBooted = "1";

    const field = mount.closest(".glypher-field");
    const input = field && field.querySelector("[data-glypher-input]");
    if (!input) return;

    createRoot(mount).render(
      createElement(GlypherField, { mount, input }),
    );
  });
}

// Auto-boot on load and after Turbo navigations.
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => boot());
  document.addEventListener("turbo:load", () => boot());
}

// Re-exported so a host app can build a custom integration instead of auto-boot.
export * from "@glypher/react";
export { StarterKit, ImageExtension } from "@glypher/starter-kit";
export { FullKit } from "@glypher/full-kit";
