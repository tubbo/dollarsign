/**
 * This module wraps the `fetch` API and handles any kind of HTTP
 * interaction, including serialization of form parameters.
 * @module ajax
 */

/**
 * Load the contents of an external URL into the elements matched by
 * this query. When a second `body` argument is passed, assume this
 * will be a POST request, otherwise it will be a GET request.
 *
 * @param {string} url - URL to load into this element as HTML.
 * @param {string} body - (optional) POST body to send along with the URL.
 * @return {Dollarsign} this object
 * @async
 */
export async function load(url, body) {
  const method = body ? "POST" : "GET";
  const response = await fetch(url, { method, body });
  const content = await response.text();

  return this.each(function () {
    this.html(content);
  });
}

/**
 * Convert the values of form controls into URL-encoded params that can
 * be sent along the wire.
 *
 * @return {string} URL-encoded params matching the values of each
 * input.
 */
export function serialize() {
  const params = new URLSearchParams(
    this.find("input").reduce((element, accumulator) => {
      accumulator[element.name] = element.value;

      return accumulator;
    }, {})
  );

  return params.toString();
}
