/**
 * @glypher/starter-kit
 *
 * The "batteries included" entry point — the MVP §20 toolset:
 * paragraphs, all six headings, bold/italic/underline/strike, link,
 * bullet/ordered/task lists, blockquote, code block, horizontal rule,
 * image, table, text alignment, hard breaks, clear-formatting, markdown
 * input shortcuts, an empty-state placeholder, and undo/redo.
 *
 * StarterKit is a bundle exposing `extensions: Extension[]`. Core's
 * `flattenExtensions` understands bundles, so it drops straight into
 * the `extensions` prop.
 */

import type { ExtensionBundle } from "@glypher/core";

import { ParagraphExtension } from "@glypher/extension-paragraph";
import { HeadingExtension } from "@glypher/extension-heading";
import { BoldExtension } from "@glypher/extension-bold";
import { ItalicExtension } from "@glypher/extension-italic";
import { UnderlineExtension } from "@glypher/extension-underline";
import { StrikeExtension } from "@glypher/extension-strike";
import { LinkExtension } from "@glypher/extension-link";
import { BlockquoteExtension } from "@glypher/extension-blockquote";
import { CodeBlockExtension } from "@glypher/extension-code-block";
import { HardBreakExtension } from "@glypher/extension-hard-break";
import { ListItemExtension } from "@glypher/extension-list-item";
import { BulletListExtension } from "@glypher/extension-bullet-list";
import { OrderedListExtension } from "@glypher/extension-ordered-list";
import { TaskListExtension } from "@glypher/extension-task-list";
import { TaskItemExtension } from "@glypher/extension-task-item";
import { TextAlignExtension } from "@glypher/extension-text-align";
import { ClearFormattingExtension } from "@glypher/extension-clear-formatting";
import { HorizontalRuleExtension } from "@glypher/extension-horizontal-rule";
import { ImageExtension } from "@glypher/extension-image";
import { TableExtension } from "@glypher/extension-table";
import { MarkdownExtension } from "@glypher/extension-markdown";
import { PlaceholderExtension } from "@glypher/extension-placeholder";
import { HistoryExtension } from "@glypher/extension-history";

export const StarterKit: ExtensionBundle = {
  name: "starter-kit",
  extensions: [
    // Block nodes
    ParagraphExtension,
    HeadingExtension,
    BlockquoteExtension,
    CodeBlockExtension,
    ListItemExtension,
    BulletListExtension,
    OrderedListExtension,
    TaskItemExtension,
    TaskListExtension,
    HardBreakExtension,
    HorizontalRuleExtension,
    ImageExtension,
    TableExtension,
    // Marks
    BoldExtension,
    ItalicExtension,
    UnderlineExtension,
    StrikeExtension,
    LinkExtension,
    // Behaviour / commands
    TextAlignExtension,
    ClearFormattingExtension,
    MarkdownExtension,
    PlaceholderExtension,
    HistoryExtension,
  ],
};

export {
  ParagraphExtension,
  HeadingExtension,
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  StrikeExtension,
  LinkExtension,
  BlockquoteExtension,
  CodeBlockExtension,
  HardBreakExtension,
  ListItemExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  TaskItemExtension,
  TextAlignExtension,
  ClearFormattingExtension,
  HorizontalRuleExtension,
  ImageExtension,
  TableExtension,
  MarkdownExtension,
  PlaceholderExtension,
  HistoryExtension,
};

export default StarterKit;
