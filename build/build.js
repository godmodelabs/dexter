//noinspection BadExpressionStatementJS
({
    "baseUrl": "../js",

    "name": "main",
    "out": "../js/main-build.js",
    //optimize: 'none',
    "insertRequire": ["main"],
    include: [
        "views/dXItem",
        "views/dXResponsiveView",
        "views/dXView",
        "views/control",
        "views/editor",
        "views/enemy",
        "views/player",
        "views/playground",
        "views/shot",
        "views/space"
    ],

    uglify: {
        max_line_length: 1000
    },

    paths: {
        templates: '../templates',
        configs: '../configs',

        // Bower components
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore-min',
        backbone: '../bower_components/backbone/backbone-min',
        epoxy: 'libs/backbone.epoxy.min',
        modernizr: '../bower_components/modernizr/modernizr',
        mustache: '../bower_components/mustache/mustache',
        ssm: '../bower_components/SimpleStateManager/src/ssm',
        eventemitter2: '../bower_components/eventemitter2/lib/eventemitter2',

        // Plugins
        text: './plugins/text',
        viewLoader: './plugins/viewLoader',
        templateLoader: './plugins/templateLoader',
        shim: './plugins/shim',
        json: '../bower_components/requirejs-plugins/lib/require/json',
        noext: '../bower_components/requirejs-plugins/lib/require/noext'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        modernizr: {
            exports: 'Modernizr'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        ssm: {
            exports: 'ssm'
        },
        'libs/debug': {
            deps: ['configs/debug.conf'],
            exports: 'debug'
        },
        'epoxy': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        'libs/uuid': {
            exports: 'uuid'
        }
    }
})