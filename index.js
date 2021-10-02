/**
 * Dollarsign is a native replacement for jQuery for manipulation of the HTML
 * DOM.
 *
 * @module dollarsign
 * @author Tom Scott <tubbo@psychedeli.ca>
 * @version 0.1.0
 */
import { $ } from "./factory";
import { css, addClass, removeClass, toggleClass, hasClass } from "./css";
import { html, text, attr, find, closest } from "./dom";
import { map, reduce } from "./enumeration";
import { on, off, fire } from "./events";

export * from "./dollarsign";

$.fn.on = on;
$.fn.off = off;
$.fn.fire = fire;
$.fn.css = css;
$.fn.hasClass = hasClass;
$.fn.addClass = addClass;
$.fn.removeClass = removeClass;
$.fn.toggleClass = toggleClass;
$.fn.html = html;
$.fn.text = text;
$.fn.attr = attr;
$.fn.find = find;
$.fn.closest = closest;
$.fn.map = map;
$.fn.reduce = reduce;

export default $;
