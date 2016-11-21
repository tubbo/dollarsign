/**
 * The NQuery object represents a collection of DOM elements grouped by the given
 * `selector`. Wraps basic browser functionality into a more consistent
 * and concise API.
 *
 * @author Tom Scott <tubbo@psychedeli.ca>
 */
class NQuery {
  /**
   * @constructor
   */
  constructor(scope, selector) {
    this.document = scope;
    this.selector = selector;
    this.events = {};
    this.map = this.elements.map;
    this.each = this.elements.forEach;
  }

  /**
   * All elements matching the given `selector`.
   *
   * @return {Array<HTMLNode>}
   */
  get elements() {
    var nodes = [];

    if (typeof this.document === 'array') {
      this.document.forEach(function(scope) {
        scope.querySelectorAll(this.selector).forEach(function(element) {
          nodes.push(element);
        });
      });
    } else {
      nodes = this.document.querySelectorAll(this.selector) || [];
    }

    return nodes;
  }

  get length() {
    return this.elements.length;
  }

  /**
   * Iterate over every element with the given callback function.
   *
   * @function each
   * @param {function} callback - Function to call on each iteration.
   * @return {NQuery} this object
   */

  /**
   * Iterate over every element with the given callback function and
   * return a new array with the return result of each callback.
   *
   * @function map
   * @param {function} callback - Function to call on each iteration.
   *                              Each return value becomes part of the Array returned.
   * @return {Array}
   */


  /**
   * Bind an event to the elements in this selection.
   *
   * @param {string} event - Name of the event to be bound.
   * @param {function} callback - Callback function to be executed when
   * event fires.
   * @return {NQuery} this object
   */
  on(event, callback) {
    this.each(element => element.addEventListener(event, callback));
    this.events[event] = callback;
    return this;
  }

  /**
   * Unbind an event from the elements in this selection.
   *
   * @param {string} event - Name of the event to be unbound.
   * @return {NQuery} this object
   */
  off(event) {
    this.each(element => element.removeEventListener(event));
    this.events.delete(event);
    return this;
  }

  /**
   * Trigger an event on all elements in this object.
   *
   * @param {string} event - Name of the event to trigger.
   * @return {NQuery} this object
   */
  fire(event) {
    return this.each((element) => element.dispatchEvent(event));
  }

  /**
   * Alter CSS for all elements in the selection.
   *
   * @param {object} updates - Hash of CSS rules to apply to each element.
   * @return {NQuery} this object
   */
  css(updates = {}) {
    Object.keys(updates).forEach(function(rule) {
      this.each(function(element) {
        element.style[rule] = updates[rule];
      });
    });
    return this;
  }

  /**
   * Alter attributes for all elements in the selection.
   *
   * @param {object} updates - Hash of attribute updates to apply to each element.
   * @return {NQuery} this object
   */
  attr(updates = {}) {
    Object.keys(updates).forEach(function(attribute) {
      this.each(element => element[attribute] = value);
    });
    return this;
  }

  /**
   * Return an NQuery object for DOM elements undernerath this selector.
   *
   * @param {string} selector - CSS selector to search for.
   * @return {NQuery} New NQuery object representing selection.
   */
  find(selector) {
    return new NQuery(this.elements, selector);
  }

  /**
   * Return an NQuery object for DOM elements above this selector.
   *
   * @param {string} selector - CSS Selector to search for.
   * @return {NQuery} New NQuery object representing selection.
   */
  closest(selector) {
    var parents = this.map((element) => element.parent);
    return new NQuery(parents, selector);
  }

  /**
   * Test whether the given class is associated with these elements.
   *
   * @param {string} name
   * @return {boolean} `true` if class is applied to given element, `false` otherwise.
   */
  hasClass(name) {
    var result = true;
    this.each(function(element) {
      if (result) {
        result = element.classList.includes(name);
      }
    });
    return result;
  }

  /**
   * Add class name to elements in query.
   *
   * @param {string} name - Name of the class to add.
   * @return {NQuery} this object.
   */
  addClass(name) {
    this.each(function(element) {
      element.classList.add(name);
    });
    return this;
  }

  /**
   * Remove class name from elements in query.
   *
   * @param {string} name - Name of the class to remove.
   * @return {NQuery} this object.
   */
  removeClass(name) {
    this.each(function(element) {
      element.classList.remove(name);
    });
    return this;
  }
}

/**
 * The plugin interface for NQuery. Add new methods to the NQuery object
 * with `NQuery.fn.myNewMethod = function(args) { ... }`
 *
 * @function NQuery.fn
 */
NQuery.fn = NQuery.prototype;

/**
 * Create a new NQuery object using the given selector and scope. If no
 * scope is provided, use the `document` to get the global page scope.
 *
 * @function $
 * @param {string} selector - Query to run for selecting elements.
 * @param {HTMLNode} scope - DOM to manipulate. Default: `document`.
 * @return {NQuery} the object created from selector and scope.
 * @author Tom Scott <tubbo@psychedeli.ca>
 */
function $(selector, scope = document) {
  return new NQuery(scope, selector);
}
