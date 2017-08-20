(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dollarsign", [], factory);
	else if(typeof exports === 'object')
		exports["dollarsign"] = factory();
	else
		root["dollarsign"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = $;

var _dollarsign = __webpack_require__(1);

var _dollarsign2 = _interopRequireDefault(_dollarsign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new NQuery object using the given selector and scope. If no
 * scope is provided, use the `document` to get the global page scope.
 *
 * @function $
 * @param {string} selector - Query to run for selecting elements.
 * @param {EventTarget} scope - DOM to manipulate. Default: `document`.
 * @return {NQuery} the object created from selector and scope.
 * @author Tom Scott <tubbo@psychedeli.ca>
 */
function $(selector) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return new _dollarsign2.default(scope, selector);
} /**
   * Dollarsign is a native replacement for jQuery for manipulation of the HTML
   * DOM.
   *
   * @module dollarsign
   * @author Tom Scott <tubbo@psychedeli.ca>
   * @version 0.1.0
   */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The Dollarsign object represents a collection of DOM elements grouped by the given
 * `selector`. Wraps basic browser functionality into a more consistent
 * and concise API.
 *
 * @class
 */
var Dollarsign = function () {
  /**
   * Query the given DOM object (or scope) for elements matching selector.
   *
   * @param EventTarget scope - DOM object to manipulate
   * @param String selector - Element query
   */
  function Dollarsign(scope, selector) {
    _classCallCheck(this, Dollarsign);

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


  _createClass(Dollarsign, [{
    key: 'each',


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
    value: function each(callback) {
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

  }, {
    key: 'map',
    value: function map(callback) {
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

  }, {
    key: 'on',
    value: function on(event, listener) {
      this.each(function (element) {
        return element.addEventListener(event, listener);
      });
      this.events[event] = listener;
      return this;
    }

    /**
     * Unbind an event from the elements in this selection.
     *
     * @param {string} event - Name of the event to be unbound.
     * @return {NQuery} this object
     */

  }, {
    key: 'off',
    value: function off(event) {
      this.each(function (element) {
        return element.removeEventListener(event);
      });
      this.events.delete(event);
      return this;
    }

    /**
     * Trigger an event on all elements in this object.
     *
     * @param {string} event - Name of the event to trigger.
     * @return {NQuery} this object
     */

  }, {
    key: 'fire',
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
    key: 'css',
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
    key: 'attr',
    value: function attr() {
      var updates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      Object.keys(updates).forEach(function (attribute) {
        this.each(function (element) {
          return element[attribute] = value;
        });
      });
      return this;
    }
  }, {
    key: 'text',
    value: function text(content) {
      return this.attr('innerText', content);
    }
  }, {
    key: 'html',
    value: function html(content) {
      return this.attr('innerHTML', content);
    }

    /**
     * Return an NQuery object for DOM elements undernerath this selector.
     *
     * @param {string} selector - CSS selector to search for.
     * @return {NQuery} New NQuery object representing selection.
     */

  }, {
    key: 'find',
    value: function find(selector) {
      return new NQuery(this.elements, selector);
    }

    /**
     * Return an NQuery object for DOM elements above this selector.
     *
     * @param {string} selector - CSS Selector to search for.
     * @return {NQuery} New NQuery object representing selection.
     */

  }, {
    key: 'closest',
    value: function closest(selector) {
      var parents = this.map(function (element) {
        return element.parent;
      });
      return new NQuery(parents, selector);
    }

    /**
     * Test whether the given class is associated with these elements.
     *
     * @param {string} name
     * @return {boolean} `true` if class is applied to given element, `false` otherwise.
     */

  }, {
    key: 'hasClass',
    value: function hasClass(name) {
      var result = false;
      this.each(function (element) {
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

  }, {
    key: 'addClass',
    value: function addClass(name) {
      this.each(function (element) {
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

  }, {
    key: 'removeClass',
    value: function removeClass(name) {
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
     * @return {NQuery} this object
     */

  }, {
    key: 'toggleClass',
    value: function toggleClass(name) {
      if (this.hasClass(name)) {
        this.removeClass(name);
      } else {
        this.addClass(name);
      }
    }
  }, {
    key: 'elements',
    get: function get() {
      var nodes = [];

      if (typeof this.document === 'array') {
        this.document.forEach(function (scope) {
          scope.querySelectorAll(this.selector).forEach(function (element) {
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

  }, {
    key: 'length',
    get: function get() {
      return this.elements.length;
    }
  }]);

  return Dollarsign;
}();

exports.default = Dollarsign;

/***/ })
/******/ ]);
});