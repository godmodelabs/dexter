**Work in Progress**

# Dexter (DX)
a responsive JavaScript framework based on backbone.js and requireJS

## Features

### MV*
todo doc

### Responsive JS
One of the key features of DX is the native integration of SimpleStateManager for true responsive JavaScript execution defined by states.

/configs/states.conf.js
```javascript
define(function() {
    return {
        // <state name>: <minimum page width>
        'Mobile': 767,
        'Desktop': 9999,
        'Tablet': 1023
    }
});
```

/js/views/myView.js
```javascript
define([ /* ... */], function(MyCollection) {

    return ResponsiveView.extend({

        draw: function() {
            // Default behaviour, will be called for every state first
        },

        drawMobile: function() {
            // For mobile only
        },

        drawTablet: function() {
            // For mobile and tablets only
        },

        drawDesktop: function() {
            // For every smaller and this state, in this case equivalent to <draw>
        }
    });

});
```

### Shim support
To enhance the use of shims, DX integrates a plugin for requireJS. Combined with the awesome Modernizr, it delivers a powerful conditional loader.

### Install script
todo doc

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

## Object Documentation

### Views

#### _view.js
This is the basic view of DX. It implements an update function, for automated lazy loading of his template.

Example for the use of _view.js
```javascript
View.extend({

    el: $('#menu'),

    // template name without file extension, will be lazy loaded from /templates
    template: 'myTemplate',

    render: function() {
        this.update();
    },

    leave: function() {
        this.$el.empty();
    }
});
 ```

#### _responsive.js
The responsive view extends our basic view.

It is important to note that the render function of a normal backbone.js view is occupied, so don't overwrite it. Use the new draw functions instead.

Example use of _responsive.js
```javascript
ResponsiveView.extend({

    draw: function() {
        // Default behaviour, will be called for every state first
    },

    drawMobile: function() {
        // For mobile only
    },

    drawTablet: function() {
        // For mobile and tablets only
    },

    drawDesktop: function() {
        // For every smaller and this state, in this case equivalent to <draw>
    }
});
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