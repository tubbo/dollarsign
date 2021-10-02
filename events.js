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
export function on(event, listener) {
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
export function off(event) {
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
export function fire(name) {
  const event = new CustomEvent(name);

  return this.each((element) => element.dispatchEvent(event));
}
