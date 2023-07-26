import * as schema from "custom-elements-manifest/schema";

export interface Options {
  /** Path to output directory */
  outdir?: string;
  /** Name of the file with you component's custom HTML data */
  htmlFileName?: string | null;
  /** Name of the file with you component's custom CSS data */
  cssFileName?: string | null;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** The property name from the component object constructed by the CEM Analyzer */
  descriptionSrc?: "description" | "summary";
  /** Displays the slot section of the element description */
  slotDocs?: boolean;
  /** Displays the event section of the element description */
  eventDocs?: boolean;
  /** Displays the CSS custom properties section of the element description */
  cssPropertiesDocs?: boolean;
  /** Displays the CSS parts section of the element description */
  cssPartsDocs?: boolean;
  /** Displays the methods section of the element description */
  methodDocs?: boolean;
  /** Overrides the default section labels in the component description */
  labels?: DescriptionLabels;
  /** Creates reusable CSS values for consistency in components */
  cssSets?: CssSet[];
}

interface DescriptionLabels {
  slots?: string;
  events?: string;
  cssProperties?: string;
  cssParts?: string;
  methods?: string;
}

export interface CssSet {
  name: string;
  values: CssValue[] | string[];
}

export interface CssValue {
  name: string;
  description?: string;
}

export interface Tag {
  name: string;
  description?: string;
  attributes?: TagAttribute[];
  references?: Reference[];
}

export interface VsCssProperty {
  name: string;
  description?: string;
  values?: Value[];
  references?: Reference[];
}

interface TagAttribute {
  name: string;
  description?: string;
  values?: Value[];
  references?: Reference[];
}

interface Value {
  name: string;
}

interface Reference {
  name: string;
  url: string;
}


/**
 * CEM TYPES
 */

export interface CssProperty extends schema.CssCustomProperty {
  type?: {
    text?: string;
  }
}

export interface Component extends schema.CustomElementDeclaration {
  cssProperties?: CssProperty[];
}

export interface CustomModule extends schema.JavaScriptModule {
    /**
   * The declarations of a module.
   *
   * For documentation purposes, all declarations that are reachable from
   * exports should be described here. Ie, functions and objects that may be
   * properties of exported objects, or passed as arguments to functions.
   */
    declarations?: Array<Component>;
}

export interface CEM extends schema.Package {
  /**
   * An array of the modules this package contains.
   */
  modules: Array<Module>;
}