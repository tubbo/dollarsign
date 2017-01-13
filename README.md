# nQuery - Native jQuery

A small library for native DOM selection and event binding. Wraps
basic browser functionality into a more consistent API. Supports most of
jQuery's basic API for event binding, DOM selection, and CSS/attribute
manipulation.

## Installation

Install nQuery with NPM:

```bash
npm install nquery --save
```

nQuery is packaged as an ES6 module, so unlike jQuery the `$` function
is not enabled globally by default. In order to use nQuery, you will
first need to import `$` (the default exported function) from the
`'nquery'` module:

```javascript
import $ from 'nquery';
```

## Usage

Use nQuery to select DOM elements and bind events:

```javascript
import $ from 'nquery';

$('#change-color').on('click', function(event) {
  event.preventDefault();
  $('h1').css({ color: '#ff000' });
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

To compile nQuery locally, download the Git repository:

```bash
$ git clone https://github.com/tubbo/nquery.git
$ cd nquery
```

Then, install dependencies:

```bash
$ npm install
$ npm install -g gulp-cli # unless you can already run `gulp`
```

Finally, run the `gulp` command to build and compile NQuery:

```bash
$ gulp
```

You can now access the fully compiled file at **pkg/nquery.js**, its
relative sourcemap at **pkg/nquery.map.js**, and a minified version of
the source at **pkg/nquery.min.js**. It will also create a tarball in
the local repo directory in case you need to export these files
elsewhere.
