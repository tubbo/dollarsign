/**
 * This module contains utility functions for iterating over elements,
 * such as `map` and `reduce`.
 *
 * @module enumeration
 */

/*
 * Iterate over every element with the given callback function and
 * return a new array with the return result of each callback.
 *
 * @param {elementIterator} callback - Function to call on each iteration.
 * @return {Array}
 */
export function map(callback) {
  const elements = [];

  for (const element of this.elements) {
    elements.push(callback(element));
  }

  return elements;
}

/**
 * Iteate over every element in the query with a callback that returns
 * a given accumulator value. This accumulator is passed through each
 * element and can be mutated over the course of the function call.
 *
 * @param {elementIterator} callback - Function to call on each iteration.
 * @param {any} initial - Initial value for the accumulator.
 * @return {any} the same value as the initial.
 */
export function reduce(callback, initial) {
  let accumulator = initial;

  for (const element of this.elements) {
    accumulator = callback(element, accumulator);
  }

  return accumulator;
}
