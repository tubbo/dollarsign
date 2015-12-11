# nQuery - Native jQuery

A small library for native DOM selection and event binding. Wraps
basic browser functionality into a more consistent API.

## Installation

```bash
$ jspm install nquery --save
```

## Usage

```html
<head>
  <script src="jspm_packages/systemjs@2.0.js" /></script>
  <script>
    System.import('nquery').then(function($) {
      $('#change-color').on('click', function(event) {
        $(this).css({ color: '#FF0000' });
      });
    });
  </script>
<body>
  <h1>I'm different!</h1>

  <nav>
    <a href="#" id="change-color">Change Color</a>
  </nav>
</body>
```
