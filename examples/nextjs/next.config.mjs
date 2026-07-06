/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The workspace packages are shipped as TS source until `pnpm build`
  // produces dist/. Transpiling the whole StarterKit graph keeps
  // `next dev` working without a prior build step.
  transpilePackages: [
    "@glypher/core",
    "@glypher/react",
    "@glypher/starter-kit",
    "@glypher/extension-bold",
    "@glypher/extension-italic",
    "@glypher/extension-underline",
    "@glypher/extension-strike",
    "@glypher/extension-heading",
    "@glypher/extension-paragraph",
    "@glypher/extension-history",
    "@glypher/extension-link",
    "@glypher/extension-blockquote",
    "@glypher/extension-code-block",
    "@glypher/extension-hard-break",
    "@glypher/extension-list-item",
    "@glypher/extension-bullet-list",
    "@glypher/extension-ordered-list",
    "@glypher/extension-task-list",
    "@glypher/extension-task-item",
    "@glypher/extension-text-align",
    "@glypher/extension-clear-formatting",
    "@glypher/extension-horizontal-rule",
    "@glypher/extension-image",
    "@glypher/extension-table",
    "@glypher/extension-markdown",
    "@glypher/extension-placeholder",
    "@glypher/theme-default",
  ],
};

export default nextConfig;
