/**
 *
 *
 * @author: Riplexus <riplexus@gmail.com>
 */

var config = {
    baseUrl: '/js',

    paths: {
        templates: '../templates',
        configs: '../configs',

        // Bower components
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore-min',
        backbone: '../bower_components/backbone/backbone-min',
        epoxy: 'libs/backbone.epoxy',
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
    },

    // Enforce define to catch 404 errors in IE
    enforceDefine: true
};

if (typeof module !== 'undefined') {
    module.exports = config;
    
} else {
    require.config(config);
    
    define(['dXBoot'], function (dXBoot) {
        dXBoot();
        
        // Your startup code
    });
    
    define('main-build', [], function() {return {};});
}