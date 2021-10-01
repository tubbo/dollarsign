/**
 * Dollarsign is a native replacement for jQuery for manipulation of the HTML
 * DOM.
 *
 * @module dollarsign
 * @author Tom Scott <tubbo@psychedeli.ca>
 * @version 0.1.0
 */

import Dollarsign from "./dollarsign";

/**
 * Create a new Dollarsign object using the given selector and scope. If no
 * scope is provided, use the `document` to get the global page scope.
 *
 * @function $
 * @param {string} selector - Query to run for selecting elements.
 * @param {EventTarget} scope - DOM to manipulate. Default: `document`.
 * @return {Dollarsign} the object created from selector and scope.
 * @author Tom Scott <tubbo@psychedeli.ca>
 */
export default function $(selector, scope = document) {
  return new Dollarsign(scope, selector);
}
