/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createOutDir, logRed, saveFile } from "integrations";
import {
  getCssPartList,
  getCssPropertyList,
  getTagList,
} from "./cem-utilities.js";
import type { Options, Tag, VsCssProperty } from "./types";
import { getComponents, type CEM, Component } from "cem-utils";
import { updateConfig } from "configurations";

export function generateCustomElementDataFiles(
  customElementsManifest: CEM,
  options: Options
) {
  options = updateConfig(options);
  const components = getComponents(customElementsManifest, options.exclude) as Component[];

  if (!components.length) {
    logRed(
      "[custom-element-vs-code-integration] - No components found."
    );
    return;
  }

  const htmlTags = options.htmlFileName ? getTagList(components) : [];
  const cssProperties = options.cssFileName
    ? getCssPropertyList(components, options.cssSets)
    : [];
  const cssParts = options.cssFileName ? getCssPartList(components) : [];

  saveCustomDataFiles(options, htmlTags, cssProperties, cssParts);
}

function saveCustomDataFiles(
  options: Options,
  tags: Tag[],
  cssProperties: VsCssProperty[],
  cssParts: VsCssProperty[]
) {
  createOutDir(options.outdir!);

  if (options.htmlFileName) {
    saveFile(
      options.outdir!,
      options.htmlFileName!,
      getCustomHtmlDataFileContents(tags)
    );
  }

  if (options.cssFileName) {
    saveFile(
      options.outdir!,
      options.cssFileName!,
      getCustomCssDataFileContents(cssProperties, cssParts)
    );
  }
}

function getCustomHtmlDataFileContents(tags: Tag[]) {
  return `{
      "$schema": "https://raw.githubusercontent.com/microsoft/vscode/master/extensions/html-language-features/server/src/htmlTags.schema.json",
      "version": 1.1,
      "tags": ${JSON.stringify(tags)}
    }`;
}

function getCustomCssDataFileContents(
  properties: VsCssProperty[],
  parts: VsCssProperty[]
) {
  return `{
      "$schema": "https://raw.githubusercontent.com/microsoft/vscode/master/extensions/css-language-features/server/src/data/browsers.schema.json",
      "version": 1.1,
      "properties": ${JSON.stringify(properties)},
      "pseudoElements": ${JSON.stringify(parts)}
    }`;
}
