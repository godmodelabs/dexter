# Dexter
Dexter is a client-side, full-featured framework with [Backbone.js] and [Epoxy.js], [RequireJS] and other libraries
useful for a super fast development of responsive Single Page Applications and Mobile Web Apps.

Your possibilities are endless. You can create a quick mockup of your upcoming native app, a responsive web tool
or even a mobile, hybrid game to be packed and deployed with apache cordova. Dexter's [Backbone] with its custom
prototypes are powerful enough to manage any complex, client-side applications.

It also provides a lot of tools to maintain high performance and low maintenance,
like building with r.js, support for TDD with karma as test runner or generating useful documentation with jsdoc.

So, what is the killer feature of Dexter? It is one of the most used buzzwords in the last years: RWD or Responsive
Web Design, but it goes further than that. Dexter is optimized to provide the user only the necessary javascript code,
html templates and stylesheets for his device. Do you want a new layout in landscape mode? No problem, Dexter swaps
the templates on the fly. Need custom javascript for android only? Just put your code in the specified folder
and it will only be loaded for android devices.

Create and maintain only one application with one data structure for every user with any device.

*tl;dr*
Create an awesome, responsive and device-optimized application with Dexter.

### Getting started
This repository provides you a basic application with example configurations to get you started.
Most of Dexter will be installed as a dependency and is encapsulated.

You need node.js and npm in your path.

1. Download the latest release of this project and extract it somewhere on your server.
2. Go to your application folder and start installation with `make install`.
3. Open your folder with a browser and see the beauty of this sample app (todo: create beautiful sample app).

### Views
In Dexter, everything is modular and follows the basic structure of Backbone.js. Lets quote from their great
documentation to explain the concept of views:

"The general idea is to organize your interface into logical views, backed by models, each of which
can be updated independently when the model changes, without having to redraw the page."

Every view in Dexter is identified by his dXName and contains of 3 Parts. The behaviour defined in a .js file
under /js/views, the layout as a .html template under /templates and an entry point in which the view
will be inserted. This can be any node with the attribute data-dX set to the dXName.

The file names and locations are important and the .js and .html file have to be named alike.

```javascript
// file: /js/views/myView.js
define([ 'dX/View' ], function(dXView) {
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

You can organize your views in as many folders as you wish inside /views, as long as you add
the folder name as a prefix to the dXName attribute.
E.g. /views/folder/calendar.js must have the dXName of 'folder__calendar'.

Dexter is client-only and can be run on any server, but one caveat of being server agnostic is
the missing file system access. To be able to load every required view of the application, even
the static and item ones (will be explained later), every view has to be declared in an array
in /configs/dXViews.conf.js. The make target 'viewlist' generates this config file automatically
for convenience.
```bash
make viewlist
```

There are basically three types of views supported in Dexter, each with different behaviour and
their corresponding prototype to be extended from.

#### Routed Views


#### Static Views
Unlike routed views, the static view does not depend on the current position (route) of the user within your
application. They will be entered on load and never leaved. Navigation headers, sidebars or overlays like
toasts or modals are good examples for this kind of views, which need to be loaded and available most of the time.

In order to recognize your view as static, extend dX/StaticView. You can place them anywhere you like,
inside your /views folder.

```javascript
// file: /views/navigation.js
define([ 'dX/StaticView' ], function(dXStaticView) {

    return dXStaticView.extend({
        dXName: 'navigation'
    });

});
```

```html
<!-- file: /templates/navigation.html -->
<ul>
<li><a href="/subpage1">SubPage1</a></li>
<li><a href="/subpage2">SubPage2</a></li>
</ul>
```

#### Item Views


#### Subviews
To reuse code and follow the principle of modularization, it is possible to use views inside another view. They
have to be declared as SubViews and their entry point is inside the parent view template.

```javascript
define([ 'dX/View' ], function(dXView) {

    return dXView.extend({
        dXName: 'myView',
        dXSubViews: ['mySubView'],
    });

});
```

```html
<!-- file: /templates/myView.html -->
<p>Hello again! I'm injecting one of the other views to reuse some work!</p>
<div data-dX="mySubView"></div>
```

Views used as subviews can itself again contain subviews. One warning though, don't use too deep constructs to maintain
high performance, subviews will be rendered after the parent view to fulfill dependencies on DOM nodes and can slow
down the application.

### Data Binding
Every Dexter view extends Backbone.Epoxy.View from [Epoxy.js], thus we can use that neat Data Binding to seamlessly
update our views, on data change.

```javascript
// file: /js/views/myView.js
define([ 'dX/View' ], function(dXView) {

    return dXView.extend({
        dXName: 'myView',
        model: new AuthorModel(),

        bindings: {
            '.name': 'text:fullName',
            '.desc': 'html:desc',
            'a': 'attr:{href:url(id)}'
        },

        computeds: {
            fullName: function() {
                return this.getBinding('firstName')+' '+
                    this.getBinding('lastName');
            }
        },

        bindingFilters: {
            url: function(id) {
                return '/profile/'+id;
            }
        }
    });
});
```

This is just a sneak peak of the many possibilities, for the full documentation see [Epoxy.js].

### Templating
If you want, you can use any templating engine beside the dynamic bindings mentioned above for static data.
dXView, the basic class of every Dexter view, provides a method called dXTemplateRenderer which can be overwritten.

```javascript
define([
    // ...
    'mustache',
    'views/dXView'
], function(Mustache, dXView) {

    // ...
    // Somewhere in your code, for example in your /js/app.js init method
    dXView.prototype.dXTemplateRenderer = function(template, data) {
        return Mustache.render(template, data);
    };
```

To send data to the Renderer set either an object or a function returning an object on dXTemplateData.

```javascript
// file: /js/views/myView.js
define([
    // ...
    'views/dXView'
], function(dXView) {

    return dXView.extend({
        dXName: 'myView',

        dXTemplateData: {
            "extUrl": "http://www.google.com"
        }
    });
```

The examples use [Mustache] to show one of many possible and easy solutions.

#### Snippets


```html
<!-- snippets/part.html -->
<span>Hello <b>{{simple}}</b></span>
```

```javascript
define([
    'text!snippets/part.html'
], function(snippet) {
    // use snippet as text or dXTemplateRenderer() in context of a dXView.
});
```

```html
<div data-dX-snippet="part" data-dX-var-simple="World">This will be replaced</div>
```

##### Loading Screen
Any view can assign a html snippet to dXView.dXLoading. It will then be inserted until every enter event
is finished and every subview is loaded. Can be enabled/disabled with dXConfig.setLoading, dXConfig.clearLoading.

```javascript
// file: /js/views/myView.js
define([ 'dX/View', 'text!snippets/loading.html' ], function(dXView, loading) {

    return dXView.extend({
        dXName: 'myView',
        dXLoading: loading
    });
});
```



### States
One of the key features of DX is the native integration of [Simple State Manager] for responsive JavaScript execution
and seamless template and stylesheet replacement.

States are defined by the minimum page width of the user window. You can target, for example, mobile, tablet
and desktop clients or differentiate between screen orientations.

```javascript
// file: /configs/dXStates.conf.js
define(function() {
    return {
        // <state name>: <minimum page width>
        'Mobile': 767,
        'Desktop': 9999,
        'Tablet': 1023
    }
});
```

#### Responsive JavaScript
If you extend the provided dXResponsiveView, you get an enter method and can execute appropriate JavaScript
code for each state.

Responsive views will leave and reenter on state change.

```javascript
// file: /js/views/myResponsiveView.js
define([ /* ... */ ], function(dXResponsiveView) {

    return dXResponsiveView.extend({
        dXName: 'myResponsiveView',

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

#### State dependent templates


#### State dependent stylesheets


### System detection


#### System dependent views/templates
Views can be different for each user system. The navigation, for example, should follow a different
style guide and behave differently on android than on iOS. Dexter allows you to simply put them in keyword folders
to fulfill this often used requirement. If no view is found for the current user system, it tries
to load a generic one under /js/views.

```javascript
// file: /js/views/navigation.js
define([ /* ... */ ], function(dXView) {
    return dXView.extend({
        dXName: 'navigation',
    });
});
```

```javascript
// file: /js/views/android/navigation.js
define([ /* ... */ ], function(dXView) {
    return dXView.extend({
        dXName: 'navigation',
    });
});
```

```javascript
// file: /js/views/iOS/navigation.js
define([ /* ... */ ], function(dXView) {
    return dXView.extend({
        dXName: 'navigation',
    });
});
```

The templates must be named alike in order for Dexter to find them.

```bash
/js/views/
|- android/
|--- navigation.js
|- iOS/
|--- navigation.js
|- navigation.js

/templates/
|- android/
|--- navigation.html
|- iOS/
|--- navigation.html
|- navigation.html
```

Hint: If you just want to differ simple js statements instead of whole views, you can use dX/libs/is for the same system
checks used here.

#### Currently supported keywords
- android
- iOS
- blackBerry
- windowsPhone
- mobile (Any OS listed above)
- desktop (Not mobile)

If you want to create custom keywords, you can add new tests in dexter-core under js/libs/is with your new keyword as key.
Note that this feature is not responsive, thus a full reload is needed if the result of your test changes and you want
it to take effect.

### Built in Shim / Polyfill support
To enhance the use of shims / polyfills, DX provides a requireJS plugin. Combined with the awesome [Modernizr] it
delivers a powerful conditional loader.

```javascript
define([
    'shim!Array.prototype.indexOf',
    'shim!Modernizr.history'
], function() {
    // ...
});
```

If one of the required features are not available, it tries to load a corresponding file from /js/libs/shims.
In our example, it will load /js/libs/shims/Array.prototype.indexOf.js and /js/libs/shims/Modernizr.history.js
for viewer 1 on IE 8 and since Chrome supports both features, it will load no additional files for viewer 2
on Chrome.

You can easily create your own shims by placing it under /js/libs/shims:

```javascript
// file: /js/libs/shims/console.js
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
references between each other and prevent complicated tree traversal, every DX prototype is connected to an
Event Emitter. Imagine the Warp Zone in Super Mario Bros. They connect different worlds
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
* dXRouter/goTo

### Makefile
The makefile included in Dexter provides an easy way to install dependencies and build your application. The
following targets are included:

* install
* test
* release
* unrelease
* viewlist

The release target starts a build script to generate the required config file for r.js, runs the optimizer and
links the requirejs entry point inside index.html to the newly generated main-build.js

### Debugging
Dexter uses a [Debug] utility based on ideas from node.js for easy and powerful output. To enable full report,
simply execute the following in any browser console, the setting will be stored in localStorage:

```javascript
debug.enable('*');
```

Quick usage:
```javascript
var log = require('libs/dX/debug')('myModule');

log('message'/* , ...*/);
```

Custom colors for an improved console overview (if supported by the browser):
```javascript
// file: /configs/dXDebug.conf.js
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

You can check out the project home ([Debug]) for more information about this library.

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

## License
(MIT)

Copyright (c) 2014 BörseGo AG, http://www.boerse-go.ag

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
