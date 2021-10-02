import { Dollarsign } from "./dollarsign";

/**
 * Create a new Dollarsign object using the given selector and scope. If no
 * scope is provided, use the `document` to get the global page scope.
 *
 * @example
 * import $ from "dollarsign"
 *
 * $(document).on("ready", async () => {
 *   await $("#test").load("https://example.com")
 *   $("#test").
 * });
 * @function $
 * @param {string} selector - Query to run for selecting elements.
 * @param {EventTarget} scope - DOM to manipulate. Default: `document`.
 * @return {Dollarsign} the object created from selector and scope.
 * @author Tom Scott <tubbo@psychedeli.ca>
 */
export function $(selector, scope = document) {
  if (selector.toString() === "[object Dollarsign]") {
    scope = selector.document;
    selector = selector.selector;
  }

  return new Dollarsign(scope, selector);
}

/**
 * Plugins that will be used when new `Dollarsign` instances are
 * created. You can add plugins to this list by adding their
 * implementations as members.
 *
 * @example
 * import $ from "dollarsign"
 *
 * $.fn.myPlugin = () => "foo"
 *
 * $(document).myPlugin() // => "foo"
 * @type {Object<string,Function>}
 * @global
 */
$.fn = {};
