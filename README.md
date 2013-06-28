**Work in Progress**

# Dexter (DX)
a responsive JavaScript framework based on backbone.js and requireJS

## Features

### Install script
todo doc

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


## Used Libraries

- bower
- Backbone.js
- RequireJS
- Mustache
- jQuery
- Modernizr
- Mocha
- Chai
- Karma
- Istanbul

## Todos
Test: responsive view
Test: base view
Test: shim plugin
Test: viewLoader plugin
Test: console shim
Test: indexOf
Test: getKeys
Test: applyMaybe

## Ideas
Extend backbone.js Router
Script: automatic installation of new components
Script: create a new view
CSS: css file loading via javascript, without media queries, dependent on current state
HTML: template loading via plugin, dependent on current state

## Special thanks to:
The contributors of [backbone]
[james-burke] for the beloved [requirejs]
[jonathan-fielding] for his very nice [ssm]
and of course every library contributor listed above, awesome work!

[jonathan-fielding]: <https://github.com/jonathan-fielding> "Jonathan Fielding"
[ssm]: <https://github.com/jonathan-fielding/SimpleStateManager/> "Simple State Manager"
[backbone]: <https://github.com/documentcloud/backbone/> "Backbone.js"
[james-burke]: <https://github.com/jrburke> "James Burke"
[requirejs]: <https://github.com/jrburke/requirejs> "RequireJS"