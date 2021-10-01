/**
 * The Dollarsign object represents a collection of DOM elements grouped by the given
 * `selector`. Wraps basic browser functionality into a more consistent
 * and concise API.
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
  }

  /**
   * All elements matching the given `selector`.
   *
   * @return {Array<Element>}
   * @readonly
   */
  get elements() {
    let nodes = [];

    if (Array.isArray(this.document)) {
      for (const scope of this.document) {
        nodes = [...nodes, ...scope.querySelectorAll(this.selector)]
      }
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
      callback(element)
    }

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
   * @callback Dollarsign~eventListener
   * @param {Event} event - Triggered event object.
   */

  /**
   * Bind an event to the elements in this selection.
   *
   * @param {string} event - Name of the event to be bound.
   * @param {eventListener} listener - Function to be executed when event fires.
   * @return {Dollarsign} this object
   */
  on(event, listener) {
    this.each((element) => element.addEventListener(event, listener));
    this.events[event] = listener;
    return this;
  }

  /**
   * Unbind an event from the elements in this selection.
   *
   * @param {string} event - Name of the event to be unbound.
   * @return {Dollarsign} this object
   */
  off(event) {
    const handler = this.events[event];

    this.each((element) => element.removeEventListener(event, handler));

    delete this.events[event];

    return this;
  }

  /**
   * Trigger an event on all elements in this object.
   *
   * @param {string} event - Name of the event to trigger.
   * @return {Dollarsign} this object
   */
  fire(name) {
    const event = new CustomEvent(name);

    return this.each((element) => element.dispatchEvent(event));
  }

  /**
   * Alter CSS for all elements in the selection.
   *
   * @param {object} updates - Hash of CSS rules to apply to each element.
   * @return {Dollarsign} this object
   */
  css(rule, value) {
    if (rule && typeof value === "undefined") {
      return this.elements[0].style[rule];
    }

    this.each((element) => element.style[rule] = value);

    return this;
  }

  /**
   * Alter attributes for all elements in the selection.
   *
   * @param {object} updates - Hash of attribute updates to apply to each element.
   * @return {Dollarsign} this object
   */
  attr(name, value) {
    if (name && typeof value === "undefined") {
      return this.elements[0].getAttribute(name);
    }

    this.each((element) => element.setAttribute(name, value));

    return this;
  }

  // TODO: Not working
  text(content) {
    if (content) {
      this.each((element) => element.innerText = content);
    }

    return this.elements[0].innerText;
  }

  /**
    * Return the inner HTML of the element.
    *
    * @param {string} content (optional) - Set the inner HTML.
    * @return {string}
    */
  html(content) {
    if (content) {
      this.each((element) => element.innerHTML = content);
    }

    return this.elements[0].innerHTML;
  }

  /**
   * Return an Dollarsign object for DOM elements undernerath this selector.
   *
   * @param {string} selector - CSS selector to search for.
   * @return {Dollarsign} New Dollarsign object representing selection.
   */
  find(selector) {
    const scope = this.elements[0];

    return new Dollarsign(scope, selector);
  }

  /**
   * Return an Dollarsign object for DOM elements above this selector.
   *
   * @param {string} selector - CSS Selector to search for.
   * @return {Dollarsign} New Dollarsign object representing selection.
   */
  closest(selector) {
    const scope = this.elements[0].parentElement.parentElement;

    return new Dollarsign(scope, selector);
  }

  /**
   * Test whether the given class is associated with these elements.
   *
   * @param {string} name
   * @return {boolean} `true` if class is applied to given element, `false` otherwise.
   */
  hasClass(name) {
    var result = false;
    this.each(function (element) {
      if (!result) {
        result = element.classList.contains(name);
      }
    });
    return result;
  }

  /**
   * Add class name to elements in query.
   *
   * @param {string} name - Name of the class to add.
   * @return {Dollarsign} this object.
   */
  addClass(name) {
    this.each(function (element) {
      element.classList.add(name);
    });
    return this;
  }

  /**
   * Remove class name from elements in query.
   *
   * @param {string} name - Name of the class to remove.
   * @return {Dollarsign} this object.
   */
  removeClass(name) {
    this.each(function (element) {
      element.classList.remove(name);
    });
    return this;
  }

  /**
   * Removes a class if the element(s) have it attached, otherwise adds
   * class to each element.
   *
   * @param {string} name - Class name.
   * @return {Dollarsign} this object
   */
  toggleClass(name) {
    if (this.hasClass(name)) {
      this.removeClass(name);
    } else {
      this.addClass(name);
    }
  }

  /**
    * Iterate over this object like you would an array.
    *
    * @return {string}
    */
  * [Symbol.iterator]() {
    for (const element of this.elements) {
      yield element
    }
  }

  /**
    * Class name of this object.
    *
    * @return {string}
    */
  get [Symbol.toStringTag]() {
    return 'Dollarsign';
  }
}
