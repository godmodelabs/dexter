/**
 *
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'underscore',
    'jquery',
    'backbone',
    'router',
    'libs/debug',
    'views/dXView',
    'eventemitter2',
    'mustache',
    'modernizr'
], function(
    _, $,
    Backbone,
    Router,
    debug,
    dXView,
    EventEmitter2,
    Mustache
) {

    return {
        router: null,
        init: function() {

            // Set template renderer
            dXView.prototype.dXTemplateRenderer = function(template, data) {
                return Mustache.render(template, data);
            };

            // Start router.
            this.router = Router;
            this.router.init();
        }
    }
});