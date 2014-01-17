**Work in Progress**

# Dexter (DX)
a responsive JavaScript framework based on backbone.js and requireJS

## Features

### MV*
todo doc

### Views
global views, independent, defined in configs/debug.conf.js, automatically loaded by the router on init

routed views, defined in routes.conf.js


```javascript
// file: /js/views/myView.js
define([ /* ... */ ], function(dXView) {

    return dXView.extend({
        dXName: 'myView',
    });

});
```

```html
<!-- file: /templates/myView.html -->
<p>Hello there, i'm proud to present myself to you!</p>
<p>I will be loaded and displayed inside /index.html</p>
```

### Subviews
Each view can incorporate any number of other views.

```javascript
define([ /* ... */ ], function(dXView) {

    return dXView.extend({
        dXName: 'myView',
        dXSubViews: ['mySubView'],
    });

});
```

```html
<!-- file: /templates/myView.html -->
<p>Hello again! I'm injecting one of the other views to reuse some work!</p>
<div id="subView"></div>
```

Views used as subviews can itself again contain subviews. One warning though, don't use too deep constructs to maintain
high performance, subviews will be rendered after the parent view to fulfill dependencies on DOM nodes and can slow
the application.

### Templating
DX uses [Mustache] to provide an easy to use templating engine. Mustache was chosen over other libraries to keep logic
out of templates and inside the views.

### Responsive JS
One of the key features of DX is the native integration of [Simple State Manager] for true responsive JavaScript
execution defined by states.

```javascript
// file: /configs/states.conf.js
define(function() {
    return {
        // <state name>: <minimum page width>
        'Mobile': 767,
        'Desktop': 9999,
        'Tablet': 1023
    }
});
```

```javascript
// file: /js/views/myResponsiveView.js
define([ /* ... */ ], function(dXResponsiveView) {

    return dXResponsiveView.extend({
        dXName: 'myView',

        enter: function() {
            // Default behaviour, will be called for every state first
        },

        enterMobile: function() {
            // For mobile only
        },

        enterTablet: function() {
            // For mobile and tablets only
        },

        enterDesktop: function() {
            // For every smaller and this state, in this case equivalent to <enter>
        }
    });

});
```

```html
<!-- file: /templates/myResponsiveView.html -->
<p>I'm more fancy than the boring basic view.</p>
```

### Shim support
To enhance the use of shims, DX integrates a plugin for requireJS. Combined with the awesome [Modernizr], it delivers a
powerful conditional loader.

```javascript
define([
    'shim!Array.prototype.indexOf',
    'shim!Modernizr.history'
], function() {

});
```

If one of the required features are not present, it tries to load a corresponding *.shim.js file from /js/libs.
In our example, it will load /js/libs/indexOf.shim.js and /js/libs/history.shim.js for viewer 1 on IE 8 and
since chrome supports both features, it will load no additional files for viewer 2 on chrome.


### Debugging
Dexter uses a [Debug] utility based on ideas from node.js for easy and powerful output. To enable it, simply execute
the following in any browser console, the setting will be stored in localStorage:

```javascript
debug.enable('*');
```

Quick usage:
```javascript
log = debug('myModule');
log('message'/* , ...*/);
```

Custom colors for improved overview:
```javascript
// debug.conf.js
define(function() {
    return {
        colors: {
            'green': '#22DD22'
        }
    };
});

log = debug('myModule');
log.green('message'/* , ...*/);
```

You should definitely check out the project home ([Debug]) for more information about this nice tool.

### Pipe event emitter network
todo doc

### Install script
todo doc

## Used Libraries

- [NPM]
- [Bower]
- [Backbone.js]
- [RequireJS]
- [Mustache]
- [jQuery]
- [Modernizr]
- [EventEmitter2]
- [mocha]
- [Chai]
- [Karma]
- [Sinon.JS]

## Todos
- Test: responsive view
- Test: base view
- Test: shim plugin
- Test: viewLoader plugin
- Test: console shim
- Test: indexOf
- Test: getKeys
- Test: applyMaybe

## Ideas
- Extend backbone.js Router
- Script: automatic installation of new components
- Script: create a new view
- CSS: css file loading via javascript, without media queries, dependent on current state
- HTML: template loading via plugin, dependent on current state

## Special thanks to:
- The contributors of [Backbone.js]
- [James Burke] for the beloved [RequireJS]
- [Jonathan Fielding] for his very nice [Simple State Manager]

and of course every contributor of the libraries listed above, awesome work!

[Jonathan Fielding]: <https://github.com/jonathan-fielding>
[Simple State Manager]: <https://github.com/jonathan-fielding/SimpleStateManager/>
[Backbone.js]: <https://github.com/documentcloud/backbone/>
[James Burke]: <https://github.com/jrburke>
[RequireJS]: <https://github.com/jrburke/requirejs>
[NPM]: <http://npmjs.org/>
[Bower]: <http://bower.io/>
[Mustache]: <http://mustache.github.io/>
[jQuery]: <http://jquery.com/>
[Modernizr]: <http://modernizr.com/>
[EventEmitter2]: <https://github.com/hij1nx/EventEmitter2>
[mocha]: <http://visionmedia.github.io/mocha/>
[Chai]: <http://chaijs.com/>
[Karma]: <http://karma-runner.github.io/0.8/index.html>
[Sinon.JS]: <http://sinonjs.org/>
[Debug]: <https://github.com/visionmedia/debug>