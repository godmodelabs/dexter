/**
 *
 *
 * @author Riplexus <riplexus@gmail.com>
 */

var config = {
    baseUrl: 'js',

    paths: {
        templates: '../templates',
        snippets: '../snippets',
        configs:   '../configs',

        // Dexter mappings
        'dX/ViewLoader':     '../bower_components/dexter-core/js/plugins/dXViewLoader',
        'dX/TemplateLoader': '../bower_components/dexter-core/js/plugins/dXTemplateLoader',
        'dX/SnippetLoader':  '../bower_components/dexter-core/js/plugins/dXSnippetLoader',
        'dX/Shim':           '../bower_components/dexter-core/js/plugins/dXShim',
        'dX/Collection':     '../bower_components/dexter-core/js/collections/Collection',
        'dX/Model':          '../bower_components/dexter-core/js/models/Model',
        'dX/ItemView':       '../bower_components/dexter-core/js/views/ItemView',
        'dX/ResponsiveView': '../bower_components/dexter-core/js/views/ResponsiveView',
        'dX/StaticView':     '../bower_components/dexter-core/js/views/StaticView',
        'dX/View':           '../bower_components/dexter-core/js/views/View',
        'dX/Boot':           '../bower_components/dexter-core/js/Boot',
        'dX/Router':         '../bower_components/dexter-core/js/Router',
        'dX/libs':           '../bower_components/dexter-core/js/libs',

        // Requirejs plugins
        text:                '../bower_components/dexter-core/js/plugins/text',
        json:                '../bower_components/dexter-core/js/plugins/json',
        shim:                '../bower_components/dexter-core/js/plugins/shim',

        // Bower components
        jquery:        '../bower_components/jquery/dist/jquery.min',
        underscore:    '../bower_components/underscore/underscore-min',
        backbone:      '../bower_components/backbone/backbone-min',
        epoxy:         '../bower_components/epoxy/backbone.epoxy',
        modernizr:     '../bower_components/modernizr/modernizr',
        mustache:      '../bower_components/mustache/mustache',
        ssm:           '../bower_components/SimpleStateManager/src/ssm',
        eventemitter2: '../bower_components/eventemitter2/lib/eventemitter2'
    },
    shim: {
        'dX/libs/debug': { exports: 'debug', deps: ['json!configs/dX.json'] },
        'dX/libs/uuid':  { exports: 'uuid' },

        underscore: { exports: '_' },
        modernizr:  { exports: 'Modernizr' },
        backbone:   { exports: 'Backbone', deps: ['underscore', 'jquery'] },
        epoxy:      { exports: 'Backbone', deps: ['backbone'] },
        ssm:        { exports: 'ssm' }
    },

    // Enforce define to catch 404 errors in IE
    enforceDefine: true
};

if (typeof module !== 'undefined') {
    module.exports = config;

} else {
    require.config(config);

    define(['dX/Boot', 'dX/View', 'mustache'], function (dXBoot, dXView, mustache) {

        // preparation code
        dXView.prototype.dXTemplateRenderer = function(template, data) {
            return mustache.render(template, data);
        };

        // start dexter application
        dXBoot();

        // Your startup code
    });

    define('main-build', [], function() {return {};});
}