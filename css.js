/**
 * Alter CSS for all elements in the selection.
 *
 * @param {object} updates - Hash of CSS rules to apply to each element.
 * @return {Dollarsign} this object
 */
export function css(rule, value) {
  if (rule && typeof value === "undefined") {
    return this.elements[0].style[rule];
  }

  this.each((element) => (element.style[rule] = value));

  return this;
}

/**
 * Test whether the given class is associated with these elements.
 *
 * @param {string} name
 * @return {boolean} `true` if class is applied to given element, `false` otherwise.
 */
export function hasClass(name) {
  let result = false;

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
export function addClass(name) {
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
export function removeClass(name) {
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
export function toggleClass(name) {
  if (this.hasClass(name)) {
    this.removeClass(name);
  } else {
    this.addClass(name);
  }

  return this;
}
