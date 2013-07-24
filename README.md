**Work in Progress**

# Dexter (DX)
a responsive JavaScript framework based on backbone.js and requireJS

## Features

### MV*
todo doc

### Views
```javascript
// file: /js/views/myView.js
define([ /* ... */ ], function(View) {

    return View.extend({
        name: 'myView',
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
define([ /* ... */ ], function(View) {

    return View.extend({
        name: 'myView',
        subViews: ['mySubView'],
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

### Responsive JS
One of the key features of DX is the native integration of [Simple State Manager] for true responsive JavaScript execution defined by states.

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
define([ /* ... */ ], function(MyCollection) {

    return ResponsiveView.extend({
        name: 'myView',

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
To enhance the use of shims, DX integrates a plugin for requireJS. Combined with the awesome [Modernizr], it delivers a powerful conditional loader.

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

### Install script
todo doc

## Object Documentation

### Views

#### _view.js
This is the basic view of DX. It implements an update function, for automated lazy loading of his template.
It is important to note that the render function of a normal backbone.js view is occupied, so don't overwrite it. Use the new enter functions instead.
If you need to prepare data the HTML is loaded, use initialize.

Example for the use of _view.js
```javascript
// example file: /js/views/myView.js
View.extend({
    name: 'myView',

    initialize: function() {},
    enter: function() {},

    leave: function() {
        this.$el.empty();
    }
});
 ```

```html
<!-- file: /templates/myView.html -->
<p>I don't like redundancy.</p>
```

#### _responsive.js
The responsive view extends our basic view.

Example use of _responsive.js
```javascript
// example file: /js/views/myResponsiveView.js
ResponsiveView.extend({
    name: 'responsiveView',

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
```

```html
<!-- file: /templates/myResponsiveView.html -->
<p>Me neither.</p>
```

## Used Libraries

- [Bower]
- [Backbone.js]
- [RequireJS]
- [Mustache]
- [jQuery]
- [Modernizr]
- [mocha]
- [Chai]
- [Karma]

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
[Bower]: <http://bower.io/>
[Mustache]: <http://mustache.github.io/>
[jQuery]: <http://jquery.com/>
[Modernizr]: <http://modernizr.com/>
[mocha]: <http://visionmedia.github.io/mocha/>
[Chai]: <http://chaijs.com/>
[Karma]: <http://karma-runner.github.io/0.8/index.html>