import { $ } from "./factory";
import { html } from "./dom";

/**
 * Load the contents of an external URL into the elements matched by
 * this query. When a second `body` argument is passed, assume this
 * will be a POST request, otherwise it will be a GET request.
 *
 * @param {string} url - URL to load into this element as HTML.
 * @param {string} body - (optional) POST body to send along with the URL.
 * @return {Dollarsign} this object
 */
export async function load(url, body) {
  const method = body ? "POST" : "GET";
  const response = await fetch(url, { method, body });
  const content = await response.text();

  $.fn.html = html;

  return this.each((element) => $(element).html(content));
}
