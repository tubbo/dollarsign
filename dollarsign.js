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
   * @constructor
   * @param {Element | Document} scope - DOM object to manipulate
   * @param {string} selector - Element query
   */
  constructor(scope, selector) {
    this.document = scope;
    this.selector = selector;
    this.events = {};

    for (const [name, plugin] of Object.entries($.fn)) {
      if (!plugin) throw new Error(`Couldn't load plugin "${name}"`);

      this[name] = plugin.bind(this);
    }

    return new Proxy(this, {
      get: (target, propKey, receiver) => {
        if (typeof propKey === "string" && this.#isSafeArrayIndex(propKey)) {
          return Reflect.get(this.elements, propKey);
        }
        return Reflect.get(target, propKey, receiver);
      },
      set: (target, propKey, value, receiver) => {
        if (typeof propKey === "string" && this.#isSafeArrayIndex(propKey)) {
          return Reflect.set(this.elements, propKey, value);
        }
        return Reflect.set(target, propKey, value, receiver);
      },
    });
  }

  /**
   * Test whether the given key that we are trying to resolve can be
   * used as an Array index. This is for internal use only, and allows
   * for Array-like behavior such as responding to `$('.selector')[0]`.
   *
   * @param {string | number} propKey
   * @return {boolean}
   * @private
   */
  #isSafeArrayIndex(propKey) {
    const uint = Number.parseInt(propKey, 10);
    const s = uint + "";

    return propKey === s && uint !== 0xffffffff && uint < this.length;
  }

  /**
   * All elements matching the given `selector`. This is calculated
   * using `querySelectorAll()` if a string selector is given.
   * Otherwise, we assume the selector is a wrapped element and return
   * it as a single-position Array.
   *
   * @return {Array<Element>}
   * @readonly
   */
  get elements() {
    if (typeof this.selector !== "string") return [this.selector];

    return this.document.querySelectorAll(this.selector);
  }

  /**
   * Counts results in the query. As this depends on `this.elements`, it
   * is also read-only and is calculated based on the value of that
   * computed attribute.
   *
   * @return {number} Count of all elements matched by the selector.
   * @readonly
   */
  get length() {
    return this.elements.length;
  }

  /**
   * Allow iteration over this object using `for..of` loops. This is
   * also used to iterate over objects with `this.each()`, but with
   * that function we provide a bit more functionality. This will only
   * iterate over the elements and not change the `this` or wrap each
   * element in a Dollarsign object.
   * @name iterator
   * @function
   * @memberof Dollarsign
   * @instance
   * @generator
   */
  *[Symbol.iterator]() {
    for (const element of this.elements) {
      yield element;
    }
  }

  /**
   * This allows us to identify Dollarsign objects without needing to
   * use `instanceof`. In bundled environments, `instanceof` doesn't
   * work because the class names can change.
   *
   * @name toString
   * @function
   * @memberof Dollarsign
   * @instance
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
      const item = new Dollarsign(this.scope, element);
      const iterate = callback.bind(item);

      iterate(element);
    }

    return this;
  }
}
