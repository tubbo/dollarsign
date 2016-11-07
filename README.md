# nQuery - Native jQuery

A small library for native DOM selection and event binding. Wraps
basic browser functionality into a more consistent API.

## Installation

```bash
$ jspm install nquery --save
```

## Usage

```javascript
// application.js

import $ from 'nquery';

$('#change-color').on('click', function(event) {
  event.preventDefault();
  $('h1').css({ color: '#ff000' });
```

```html
<body>
  <h1>I'm different!</h1>

  <nav>
    <a href="#" id="change-color">Change Color</a>
  </nav>
</body>
```

## Development

To compile NQuery locally, download the Git repository:

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
