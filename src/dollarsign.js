/**
 * The Dollarsign object represents a collection of DOM elements grouped by the given
 * `selector`. Wraps basic browser functionality into a more consistent
 * and concise API.
 *
 * @class
 */
export default class Dollarsign {
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
  }

  /**
   * All elements matching the given `selector`.
   *
   * @return {Array<Element>}
   * @readonly
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
   * Function executed when iterating over a collection of DOM elements.
   *
   * @callback NQuery~elementIterator
   * @param {NQuery} element - Each element selected from the DOM.
   * @param {Number} index - Index number of each element in the Array.
   */

  /**
   * Iterate over every element with the given callback function.
   *
   * @param {elementIterator} callback - Function to call on each iteration.
   * @return {NQuery} this object
   */
  each(callback) {
    this.elements.forEach(callback);
    return this;
  }

  /**
   * Iterate over every element with the given callback function and
   * return a new array with the return result of each callback.
   *
   * @param {elementIterator} callback - Function to call on each iteration.
   * @return {Array}
   */
  map(callback) {
    return this.elements.map(callback);
  }

  /**
   * Function executed when a DOM event is triggered.
   *
   * @callback NQuery~eventListener
   * @param {Event} event - Triggered event object.
   */

  /**
   * Bind an event to the elements in this selection.
   *
   * @param {string} event - Name of the event to be bound.
   * @param {eventListener} listener - Function to be executed when event fires.
   * @return {NQuery} this object
   */
  on(event, listener) {
    this.each(element => element.addEventListener(event, listener));
    this.events[event] = listener;
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

  text(content) {
    return this.attr('innerText', content);
  }

  html(content) {
    return this.attr('innerHTML', content);
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
    var result = false;
    this.each(function(element) {
      if (!result) {
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

  /**
   * Removes a class if the element(s) have it attached, otherwise adds
   * class to each element.
   *
   * @param {string} name - Class name.
   * @return {NQuery} this object
   */
  toggleClass(name) {
    if (this.hasClass(name)) {
      this.removeClass(name);
    } else {
      this.addClass(name);
    }
  }
}
