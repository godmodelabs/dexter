/**
 *
 *
 * @author: Riplexus <riplexus@gmail.com>
 */

var config = {
    baseUrl: '/js',

    paths: {
        dX: '../dX',
        templates: '../templates',
        configs: '../configs',
        
        // Dexter mappings
        dXViewLoader: '../dX/plugins/dXViewLoader',
        dXTemplateLoader: '../dX/plugins/dXTemplateLoader',
        dXShim: '../dX/plugins/dXShim',
        'dX/Collection': '../dX/collections/Collection',
        'dX/Model': '../dX/models/Model',
        'dX/ItemView': '../dX/views/ItemView',
        'dX/ResponsiveView': '../dX/views/ResponsiveView',
        'dX/View': '../dX/views/View',
        'dX/Boot': '../dX/Boot',
        'dX/Router': '../dX/Router',

        // Bower components
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore-min',
        backbone: '../bower_components/backbone/backbone-min',
        epoxy: '../dX/libs/backbone.epoxy',
        modernizr: '../bower_components/modernizr/modernizr',
        mustache: '../bower_components/mustache/mustache',
        ssm: '../bower_components/SimpleStateManager/src/ssm',
        eventemitter2: '../bower_components/eventemitter2/lib/eventemitter2',

        // Plugins
        text: '../dX/plugins/text',
        shim: '../dX/plugins/shim',
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
        'epoxy': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        ssm: {
            exports: 'ssm'
        },
        'dX/libs/debug': {
            deps: ['configs/dXDebug.conf'],
            exports: 'debug'
        },
        'dX/libs/uuid': {
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
    
    define(['dX/Boot'], function (dXBoot) {
        dXBoot();
        
        // Your startup code
    });
    
    define('main-build', [], function() {return {};});
}