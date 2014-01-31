/**
 *
 *
 * @author: Riplexus <riplexus@gmail.com>
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
        dXRouter: null,
        init: function() {

            // Start router.
            this.dXRouter = Router;
            this.dXRouter.init();
        }
    };
});