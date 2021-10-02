import { $ } from "./factory";

/**
 * The Dollarsign object represents a collection of DOM elements grouped by the given
 * `selector`. Wraps basic browser functionality into a more consistent
 * and concise API. The implementation of this class contains only the
 * bare minimum necessary to implement all of Dollarsign's
 * functionality, and the rest of it is implemented in various modules.
 *
 * @class
 */
export class Dollarsign {
  /**
   * Query the given DOM object (or scope) for elements matching selector.
   *
   * @param EventTarget scope - DOM object to manipulate
   * @param String selector - Element query
   */
  constructor(scope, selector) {
    this.document = scope;
    this.selector = selector;
    this.events = {};

    for (const [name, plugin] of Object.entries($.fn)) {
      if (!plugin) throw new Error(`Couldn't load plugin "${name}"`);

      this[name] = plugin.bind(this);
    }
  }

  /**
   * All elements matching the given `selector`.
   *
   * @return {Array<Element>}
   * @readonly
   */
  get elements() {
    if (typeof this.selector !== "string") return [this.selector];

    return this.document.querySelectorAll(this.selector);
  }

  /**
   * Counts results in the query.
   *
   * @return {Number} Count of all elements matched by the selector.
   * @readonly
   */
  get length() {
    return this.elements.length;
  }

  /**
   * Configure this class as an "iterator", meaning it can be used in
   * `for..of` loops and indexed by number.
   *
   * @return {string}
   */
  *[Symbol.iterator]() {
    for (const element of this.elements) {
      yield element;
    }
  }

  /**
   * Class name of this object.
   *
   * @return {string}
   */
  get [Symbol.toStringTag]() {
    return "Dollarsign";
  }

  /**
   * Function executed when iterating over a collection of DOM elements.
   *
   * @callback Dollarsign~elementIterator
   * @param {Dollarsign} element - Each element selected from the DOM.
   * @param {Number} index - Index number of each element in the Array.
   */

  /**
   * Iterate over every element with the given callback function.
   *
   * @param {elementIterator} callback - Function to call on each iteration.
   * @return {Dollarsign} this object
   */
  each(callback) {
    for (const element of this) {
      callback(element);
    }

    return this;
  }
}
