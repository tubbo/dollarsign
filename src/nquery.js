/**
 * nQuery - Native jQuery
 *
 * A small library for native DOM selection and event binding. Wraps
 * basic browser functionality into a more consistent API.
 *
 * @author Tom Scott <tubbo@psychedeli.ca>
 * @module nquery
 *
 */
class NQuery {
  /**
   * @constructor
   * @param {HTMLDocument} scope - The global document at the time of
   * instantiation.
   * @param {string} selector - A CSS-style selector used for picking
   * out DOM objects.
   */
  constructor(scope, selector) {
    this.document = scope;
    this.selector = options.selector;
    this.events = {};
  }

  /**
   * Return all elements selected by the given `selector`.
   *
   * @return {Array<HTMLElement>} all elements in the selection
   */
  get elements() {
    return this.document.getElementsBySelector(this.selector);
  }

  /**
   * Iterate over every element with the given callback function.
   *
   * @param {function} callback
   * @return {this}
   */
  each(callback) {
    return this.elements.forEach(callback);
  }

  /**
   * Bind an event to the elements in this selection.
   *
   * @param {string} event - Name of the event to be bound.
   * @param {function} callback - Callback function to be executed when
   * event fires.
   * @return {this}
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
   * @return {this}
   */
  off(event) {
    this.each(element => element.removeEventListener(event));
    this.events.delete(event);
    return this;
  }

  /**
   * Alter CSS for all elements in the selection.
   *
   * @return {this}
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
   * Alter attributes.
   *
   * @param {string} key
   * @param value
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
   * @param {string} selector
   * @return {NQuery}
   */
  find(selector) {
    return new NQuery(this.elements[0], selector);
  }

  /**
   * Return an NQuery object for DOM elements above this selector.
   *
   * @param {string} selector
   * @return {NQuery}
   */
  closest(selector) {
    return new NQuery(this.elements[0].parent, selector);
  }
}

/**
 * "Main" method that is exported as `$`. All this does is instantiate
 * an `NQuery` object, then return it.
 *
 * @param {string} selector
 * @param {Object} scope
 * @return {NQuery}
 * @module nquery
 */
export default function(selector, scope) {
  let dom = scope || document;
  return new NQuery(dom, selector);
}
