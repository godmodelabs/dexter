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
    'eventemitter2',
    'modernizr'
], function(
    _, $,
    Backbone,
    Router,
    debug,
    EventEmitter2
) {

    return {
        router: null,
        init: function() {

            // Start router.
            this.router = Router;
            this.router.init();
        }
    }
});