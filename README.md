# Dexter
Dexter is a full featured framework using backbone.js combined with requireJS and other libraries useful for
the development of responsive Single Page Applications. It adds a few ideas of its own and tries to maintain high
flexibility by providing simple feature interfaces. Want to use your own library? Simply overwrite the feature
method. But the main goal is to provide the developer an easy All-in-One package to start the implementation
of your application right after `make install`.

### Views

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
<p>Minions ipsum gelatooo tulaliloo tank yuuu!</p>
```

```html
<!-- file: /index.html -->
<!-- ... -->
<section data-dX='myView'></section>
<!-- ... -->
```


#### Global Views
independent, defined in configs/dexter.conf.js, automatically loaded by the router on init

#### Routed Views
defined in routes.conf.js, will be loaded on navigation

#### Subviews
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

#### Item Views
used in collections, preloaded in configs/dexter.conf.js

### Dependent view loading
Global, Routed and Subviews can be different for each user agent. The navigation, for example, should follow a different
style guide and behave differently on android than on iOS. Dexter allows you to simply use keywords on the entry
points of view declaration to fulfill this often used requirement.

```javascript
// file: /js/views/myView.js
define([ /* ... */ ], function(dXView) {
    return dXView.extend({
        dXName: 'myView',
        dXSubViews: [
            'android!navigation'
            'iOS!navigation'
        ],
    });
});
```

```javascript
// file: /configs/dexter.conf.js
define(function() {
    return {
        // ...
        global: [
            'android!navigation',
            'iOS!navigation'
        ]
    };
});
```

```javascript
// file: /configs/routes.conf.js
define(function() {
    return {
        // ...
        'user': 'iOS!user',
        'profile': [
            'android!profile',
            'iOS!profile',
        ]
    };
});
```

If no definition is found for the current user system, it omits the first keyword (e.g. 'android!navigation' -> 'navigation').
Deeper and more specific declarations have priority ('android!navigation' > 'navigation').


The specific views and templates must be named equally and have to be stored in corresponding folders:

```bash
/js/views/  
|- android/  
|--- navigation.js  
|- iOS/  
|--- navigation.js
```

```bash
/templates/  
|- android/  
|--- navigation.html  
|- iOS/  
|--- navigation.html  
```

Hint: If you just want to differ simple js statements instead of whole views, you can use libs/is for the same system
checks used here.

#### Currently supported keywords
- android
- iOS
- blackBerry
- windowsPhone
- mobile (For every OS listed above)
- desktop (not mobile)

If you want to create custom keywords, you can just add a new test in libs/is, the key is your new keyword.
Note that this feature is not responsive, thus a full reload is needed if the result of your test changes and you want
it to take effect.

### State dependent template loading



### State dependent stylesheet loading



### Data Binding



### Templating
The dXView class provides a renderer function, which can be overwritten to support any templating engine you want
to use.

```javascript
// Somewhere in your code, for example in your /js/app.js
var Mustache = require('mustache');

dXView.prototype.dXTemplateRenderer = function(template, data) {
    return Mustache.render(template, data);
};
```

The example branch uses [Mustache] to show one of many possible and easy solutions.

### Responsive JavaScript
One of the key features of DX is the native integration of [Simple State Manager] in our view loader and router for
true responsive JavaScript execution defined by states.

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
            // For tablets only
        },

        enterDesktop: function() {
            // For big desktop only
        }
    });

});
```

```html
<!-- file: /templates/myResponsiveView.html -->
<p>I'm more fancy than the boring basic view.</p>
```

### Shim support
To enhance the use of shims, DX provides a plugin for requireJS. Combined with the awesome [Modernizr], it delivers a
powerful conditional loader.

```javascript
define([
    'shim!Array.prototype.indexOf',
    'shim!Modernizr.history'
], function() {
    // ...
});
```

If one of the required features are not present, it tries to load a corresponding *.shim.js file from /js/libs.
In our example, it will load /js/libs/indexOf.shim.js and /js/libs/history.shim.js for viewer 1 on IE 8 and
since Chrome supports both features, it will load no additional files for viewer 2 on Chrome.

You can easily create your own shims by placing a *.shim.js file under /js/libs:

```javascript
// file: /js/libs/console.shim.js
define(function() {

    window.console = {
        log: function() {},
        error: function() {},
        warn: function() {},
        trace: function() {}
    };

    return true;
});

// Anywhere in your code:
define(['shim!console'], function() {
    console.log("I'm a teapot!");
});
```

### Pipe event emitter
One of the problems we often see is the (mostly previously unknown) requirement to send data from one module to
another across half of your application. To maintain flexibility, reduce the amount of object
references between each other and prevent complicated tree traversal, Dexter comes with an Event Emitter
integrated in every DX prototype. Imagine the Warp Zone in Super Mario Bros. They connect different worlds
and places so you can send any data (like yourself) from one opening to the other, simply by providing the
desired world number on your package.

```javascript
// file: /js/views/world1-2.js
dXView.extend({
    //...
    enter: function() {
        this.dXPipe.emit('jump', 4);
    },
});
```

```javascript
// file: /js/models/mario.js
Mario = dXModel.extend({
    //...
    initialize: function() {
        //...
        this.dXPipe.on('jump', function(target) {
            Mario.set('world', target);
        })
    }
});
```

#### Events
* enter/:dXName
* enter/:state/:dXName
* leave/:dXName

### Folder structure

|- assets/
|- configs/
|- js/
|--- collections/
|--- libs/
|--- models/
|--- plugins/
|--- tests/...
|--- views/
|- templates/
|- index.html

### Install script


### Debugging
Dexter uses a [Debug] utility based on ideas from node.js for easy and powerful output. To enable full report,
simply execute the following in any browser console, the setting will be stored in localStorage:

```javascript
debug.enable('*');
```

Quick usage:
```javascript
var log = require('libs/debug')('myModule');

log('message'/* , ...*/);
```

Custom colors for an improved console overview (if supported by the browser):
```javascript
// file: /configs/debug.conf.js
define(function() {
    return {
        colors: {
            'green': '#22DD22'
        }
    };
});
```

The colors will be provided to the logger as methods:

```javascript
log.green('message'/* , ...*/);
```

You should definitely check out the project home ([Debug]) for more information about this useful tool.

### Testing
We provide a pre-configured [Karma] file (using [Jasmine] as testing framework) and activated code coverage. Put
your tests under /js/tests and you are ready to go!

Start Karma and run every test:
```bash
make test
```

Don't forget to update /configs/karma.conf.js and the /js/tests/test-main.js entry point if you include new libraries
in your project.

### Documentation
If you want to use JSDoc for automated documentation, you can easily do so with the available configuration
file under /configs/. You can compile it with the provided template or your own by declaring the path in the
/configs/jsdoc.json or by replacing the content of /docs/template.

## Libraries used in this framework

- [Backbone.js]
    - Underscore
    - Backbone Epoxy
- [RequireJS]
    - Text Plugin
    - RequireJS-plugins
- [jQuery]
- [Modernizr]
- [EventEmitter2]
- [Simple State Manager]

## In Development
- Extend backbone.js Router
- Script: automatic installation of new components
- Script: create a new view
- CSS: css file loading via javascript, without media queries, dependent on current state
- HTML: template loading via plugin, dependent on current state
- Filesystem cached main-build.js?

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
[jQuery]: <http://jquery.com/>
[Modernizr]: <http://modernizr.com/>
[EventEmitter2]: <https://github.com/hij1nx/EventEmitter2>
[Jasmine]: <http://jasmine.github.io/>
[Karma]: <http://karma-runner.github.io/0.8/index.html>
[Debug]: <https://github.com/visionmedia/debug>