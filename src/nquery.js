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
export class NQuery {
  /**
   * @constructor
   * @param HTMLDocument scope - The global document at the time of
   * instantiation.
   * @param string selector - A CSS-style selector used for picking
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
   * @return Array all elements in the selection
   */
  get elements() {
    return this.document.getElementsBySelector(this.selector);
  }

  /**
   * Iterate over every element with the given callback function.
   *
   * @param function callback
   * @return NQuery this object
   */
  each(callback) {
    this.elements.forEach(callback);
    return this;
  }

  /**
   * Iterate over every element with the given callback function and
   * return a new array with the return result of each callback.
   *
   * @param function callback
   * @return Array
   */
  map(callback) {
    return this.elements.map(callback);
  }

  /**
   * Bind an event to the elements in this selection.
   *
   * @param string event - Name of the event to be bound.
   * @param function callback - Callback function to be executed when
   * event fires.
   * @return NQuery this object
   */
  on(event, callback) {
    this.each(element => element.addEventListener(event, callback));
    this.events[event] = callback;
    return this;
  }

  /**
   * Unbind an event from the elements in this selection.
   *
   * @param string event - Name of the event to be unbound.
   * @return NQuery this object
   */
  off(event) {
    this.each(element => element.removeEventListener(event));
    this.events.delete(event);
    return this;
  }

  /**
   * Alter CSS for all elements in the selection.
   *
   * @param object Hash of CSS rules to apply to each element.
   * @return NQuery this object
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
   * @param string key
   * @param NQuery this object
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
   * @param string selector
   * @return NQuery object for selection beneath current object scope.
   */
  find(selector) {
    return new NQuery(this.elements[0], selector);
  }

  /**
   * Return an NQuery object for DOM elements above this selector.
   *
   * @param string selector
   * @return NQuery object for selection underneath parent scope.
   */
  closest(selector) {
    return new NQuery(this.elements[0].parent, selector);
  }

  /**
   * All CSS classes associated with this element.
   *
   * @return array of strings
   */
  get classes() {
    return [].concat(this.map((element) => element.class.split("\s")));
  }

  /**
   * Test whether the given class is associated with these elements.
   *
   * @param string name
   * @return boolean whether the class is applied to this element.
   */
  hasClass(name) {
    return this.classes.includes(name);
  }

  /**
   * Add class name to elements in query.
   *
   * @param string name
   * @return NQuery this object.
   */
  addClass(name) {
    if (!this.hasClass(name)) {
      this.classes += name;
    }
    return _updateClass();
  }

  /**
   * Remove class name from elements in query.
   *
   * @param string name
   * @return NQuery this object.
   */
  removeClass(name) {
    if (this.hasClass(name)) {
      this.classes = this.classes.splice(this.classes.indexOf(name), 1);
      return _updateClass();
    } else {
      return this;
    }
  }

  /**
   * Update class name of elements in query with the array stored in
   * `classes`.
   *
   * @return NQuery this object.
   */
  _updateClass() {
    return this.each((element) => element.class = this.classes.join("\s"));
  }
}

/**
 * Create a new NQuery object using the given selector and scope. If no
 * scope is provided, use the `document` to get the global page scope.
 *
 * @param string selector - Query to run for selecting elements.
 * @param Object scope (optional) - DOM to manipulate, `document` by default
 * @return NQuery the object created from selector and scope.
 * @module nquery
 */
export default function(selector, scope) {
  scope = scope || document;
  return new NQuery(scope, selector);
}
