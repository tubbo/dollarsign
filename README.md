# Dollarsign - Native jQuery

A small library for native DOM selection and event binding. Wraps
basic browser functionality into a more consistent API. Supports most of
jQuery's basic API for event binding, DOM selection, and CSS/attribute
manipulation.

## Installation

Install Dollarsign with NPM:

```bash
$ npm install dollarsign --save
```

Or Yarn:

```bash
$ yarn add dollarsign
```

You can then import the `$` factory function:

```javascript
import $ from "dollarsign";
```

## Usage

Use Dollarsign to select DOM elements and bind events:

```javascript
import $ from "dollarsign";

$("#change-color").on("click", function (event) {
  event.preventDefault();
  $("h1").css({ color: "#ff000" });
});
```

```html
<body>
  <h1>I'm different!</h1>

  <nav>
    <a href="#" id="change-color">Change Color</a>
  </nav>
</body>
```

Much of the jQuery API is provided, with some notable exceptions (like
`$.ajax`).

### Programmatic Usage

You can also use the `Dollarsign` class on its own and build your own
factory function:

```javascript
import { Dollarsign } from "dollarsign";

function $(selector) {
  return new Dollarsign(document, selector);
}
```

### Plugins

Plugins are similar to the jQuery implementation:

```javascript
$.fn.plugin = function () {
  this.each((element) => {
    $(element).addClass("plugined");
  });
};

$("#element").plugin();
$("#element").hasClass("plugined"); // => true
```

### API Documentation

For more information about what API methods are implemented, visit the
documentation at https://tubbo.github.io/dollarsign

## Development

To contribute to Dollarsign, download the Git repository:

```bash
$ git clone https://github.com/tubbo/dollarsign.git
$ cd dollarsign
```

Then, install dependencies:

```bash
$ yarn install
```

Make your changes to the `.js` files and run tests to make sure
everything still works (and write tests for new functionality!):

```bash
$ yarn test
```

### Static Analysis

We use [Prettier][] for code formatting and [ESLint][] for linting.
These two tools help us ensure a consistent style and code quality.

Run lint checks to ensure your code matches our style guide:

```bash
$ yarn lint
```

If the checks flag anything, reformat your code:

```bash
$ yarn fmt
```

### Contributing Documentation

After editing the JSDoc, ensure your documentation looks correctly by
building it locally:

```bash
$ yarn docs
```

Then, open `docs/index.html` in your browser.


