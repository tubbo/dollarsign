# Dollarsign - Native jQuery

A small library for native DOM selection and event binding. Wraps
basic browser functionality into a more consistent API. Supports most of
jQuery's basic API for event binding, DOM selection, and CSS/attribute
manipulation.

## Installation

Install Dollarsign with NPM:

```bash
npm install dollarsign --save
```

Dollarsign is packaged as an ES6 module, so unlike jQuery the `$` function
is not enabled globally by default. In order to use Dollarsign, you will
first need to import `$` (the default exported function) from the
`'dollarsign'` module:

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

## Development

To compile Dollarsign locally, download the Git repository:

```bash
$ git clone https://github.com/tubbo/dollarsign.git
$ cd dollarsign
```

Then, install dependencies:

```bash
$ yarn install
```

Finally, run `yarn build` to build the `nquery.js` file locally:

```bash
$ yarn build
```

You can now access the fully compiled file at **dollarsign.js**.

To run tests:

```bash
$ yarn test
```
