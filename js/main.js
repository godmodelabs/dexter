require.config({

    baseUrl: '/js',

    paths: {
        templates: '../templates',
        configs: '../configs',

        // Bower components
        jquery: '../components/jquery/jquery',
        underscore: '../components/underscore/underscore-min',
        backbone: '../components/backbone/backbone-min',
        modernizr: '../components/modernizr/modernizr',
        mustache: '../components/mustache/mustache',
        chai: '../node_modules/chai/chai',
        ssm: '../components/SimpleStateManager/js/ssm.min',

        // Plugins
        text: './plugins/text',
        viewLoader: './plugins/viewLoader',
        shim: './plugins/shim'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        modernizr: {
            exports: 'Modernizr'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        ssm: {
            exports: "ssm"
        }
    },

    // Enforce define to catch 404 errors in IE
    enforceDefine: true
});

define(['app'], function (App) {

    // Redirect #! to /
    if (window.location.hash.indexOf('!') > -1) {
        window.location = window.location.hash.substring(2);
        return;
    }

    App.init();
});