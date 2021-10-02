import { Dollarsign } from "./dollarsign";

/**
 * Returns the inner text of the element.
 *
 * @param {string} content (optional) - Set the inner text.
 * @return {string | Dollarsign} text value or this object.
 */
export function text(content) {
  if (content) {
    return this.each((element) => (element.textContent = content));
  }

  return this.elements[0].textContent;
}

/**
 * Return the inner HTML of the element.
 *
 * @param {string} content (optional) - Set the inner HTML.
 * @return {string | Dollarsign} html value or this object.
 */
export function html(content) {
  if (content) {
    return this.each((element) => (element.innerHTML = content));
  }

  return this.elements[0].innerHTML;
}

/**
 * Return an Dollarsign object for DOM elements undernerath this selector.
 *
 * @param {string} selector - CSS selector to search for.
 * @return {Dollarsign} New Dollarsign object representing selection.
 */
export function find(selector) {
  const scope = this.elements[0];

  return new Dollarsign(scope, selector);
}

/**
 * Return an Dollarsign object for DOM elements above this selector.
 *
 * @param {string} selector - CSS Selector to search for.
 * @return {Dollarsign} New Dollarsign object representing selection.
 */
export function closest(selector) {
  const scope = this.elements[0].parentElement.parentElement;

  return new Dollarsign(scope, selector);
}

/**
 * Alter attributes for all elements in the selection.
 *
 * @param {object} updates - Hash of attribute updates to apply to each element.
 * @return {Dollarsign} this object
 */
export function attr(name, value) {
  if (name && typeof value === "undefined") {
    return this.elements[0].getAttribute(name);
  }

  this.each((element) => element.setAttribute(name, value));

  return this;
}
