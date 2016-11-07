"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (selector) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return new NQuery(scope, selector);
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a collection of DOM elements grouped by the given
 * `selector`. Wraps basic browser functionality into a more consistent
 * and concise API.
 *
 * @author Tom Scott <tubbo@psychedeli.ca>
 */
var NQuery = exports.NQuery = function () {
  /**
   * @constructor
   */
  function NQuery(scope, selector) {
    _classCallCheck(this, NQuery);

    this.document = scope;
    this.selector = options.selector;
    this.events = {};
  }

  /**
   * All elements matching the given `selector`.
   */


  _createClass(NQuery, [{
    key: "each",


    /**
     * Iterate over every element with the given callback function.
     *
     * @param {function} callback - Function to call on each iteration.
     * @return {NQuery} this object
     */
    value: function each(callback) {
      this.elements.forEach(callback);
      return this;
    }

    /**
     * Iterate over every element with the given callback function and
     * return a new array with the return result of each callback.
     *
      * @param {function} callback - Function to call on each iteration.
      *                              Each return value becomes part of the Array returned.
     * @return {Array}
     */

  }, {
    key: "map",
    value: function map(callback) {
      return this.elements.map(callback);
    }

    /**
     * Bind an event to the elements in this selection.
     *
     * @param {string} event - Name of the event to be bound.
     * @param {function} callback - Callback function to be executed when
     * event fires.
     * @return {NQuery} this object
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      this.each(function (element) {
        return element.addEventListener(event, callback);
      });
      this.events[event] = callback;
      return this;
    }

    /**
     * Unbind an event from the elements in this selection.
     *
     * @param {string} event - Name of the event to be unbound.
     * @return {NQuery} this object
     */

  }, {
    key: "off",
    value: function off(event) {
      this.each(function (element) {
        return element.removeEventListener(event);
      });
      this.events.delete(event);
      return this;
    }

    /**
     * Trigger an event on all elements in this object.
     * @param {string} event - Name of the event to trigger.
     * @return {NQuery} this object
     */

  }, {
    key: "fire",
    value: function fire(event) {
      return this.each(function (element) {
        return element.dispatchEvent(event);
      });
    }

    /**
     * Alter CSS for all elements in the selection.
     *
     * @param {object} updates - Hash of CSS rules to apply to each element.
     * @return {NQuery} this object
     */

  }, {
    key: "css",
    value: function css() {
      var updates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Object.keys(updates).forEach(function (rule) {
        this.each(function (element) {
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

  }, {
    key: "attr",
    value: function attr() {
      var updates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Object.keys(updates).forEach(function (attribute) {
        this.each(function (element) {
          return element[attribute] = value;
        });
      });
      return this;
    }

    /**
     * Return an NQuery object for DOM elements undernerath this selector.
     *
     * @param {string} selector - CSS selector to search for.
     * @return {NQuery} New NQuery object representing selection.
     */

  }, {
    key: "find",
    value: function find(selector) {
      return new NQuery(this.elements[0], selector);
    }

    /**
     * Return an NQuery object for DOM elements above this selector.
     *
     * @param {string} selector - CSS Selector to search for.
     * @return {NQuery} New NQuery object representing selection.
     */

  }, {
    key: "closest",
    value: function closest(selector) {
      return new NQuery(this.elements[0].parent, selector);
    }

    /**
     * Test whether the given class is associated with these elements.
     *
     * @param {string} name
     * @return {boolean} `true` if class is applied to given element, `false` otherwise.
     */

  }, {
    key: "hasClass",
    value: function hasClass(name) {
      return this.classes.includes(name);
    }

    /**
     * Add class name to elements in query.
     *
     * @param {string} name - Name of the class to add.
     * @return {NQuery} this object.
     */

  }, {
    key: "addClass",
    value: function addClass(name) {
      if (!this.hasClass(name)) {
        this.classes += name;
      }
      return _updateClass();
    }

    /**
     * Remove class name from elements in query.
     *
     * @param {string} name - Name of the class to remove.
     * @return {NQuery} this object.
     */

  }, {
    key: "removeClass",
    value: function removeClass(name) {
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
     * @private
     * @return {NQuery} this object.
     */

  }, {
    key: "_updateClass",
    value: function _updateClass() {
      var _this = this;

      return this.each(function (element) {
        return element.class = _this.classes.join("\s");
      });
    }
  }, {
    key: "elements",
    get: function get() {
      return this.document.getElementsBySelector(this.selector);
    }

    /**
     * All CSS classes associated with this element.
     */

  }, {
    key: "classes",
    get: function get() {
      return [].concat(this.map(function (element) {
        return element.class.split("\s");
      }));
    }
  }]);

  return NQuery;
}();

/**
 * Create a new NQuery object using the given selector and scope. If no
 * scope is provided, use the `document` to get the global page scope.
 *
 * @module nquery
 * @function $
 * @param {string} selector - Query to run for selecting elements.
 * @param {HTMLNode} scope - DOM to manipulate. Default: `document`.
 * @return {NQuery} the object created from selector and scope.
 * @author Tom Scott <tubbo@psychedeli.ca>
 */
//# sourceMappingURL=nquery.js.map
