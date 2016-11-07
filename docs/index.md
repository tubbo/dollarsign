# nQuery - Native JQuery

nquery is a javascript module for DOM manipulation that attempts to use
native functions and DOM APIs as much as possible. This reduces the code
size and makes the slightly "wordy" DOM API a lot easier to use.

It exposes an API very similar to [jQuery][]...

```javascript
$('#change-color').on('click', function(event) {
  event.preventDefault();
  $(event.currentTarget).css({ color: '#ff0000' });
});
```

However, nQuery removes the following features as they don't pertain to
DOM manipulation:

* Animations, which can be done using [CSS Animations][].
* AJAX, which can be replaced with the [fetch][] API.

## Getting Started

Download nQuery from NPM:

```bash
$ npm install nquery
```

Require it in your application:

```javascript
import $ from 'nquery';
```

Manipulate the DOM by generating new `NQuery` objects with the `$()`
function.

## More Information

* [API Documentation][]
* [Source Code][]
* [Issue Tracker][]

[jQuery]: https://jquery.com
[CSS Animations]: https://mdn.mozilla.org
[fetch]: https://mdn.mozilla.org
[API Documentation]: https://tubbo.github.io/nquery/api
[Source Code]: https://github.com/tubbo/nquery
[Issue Tracker]: https://github.com/tubbo/nquery/issues
