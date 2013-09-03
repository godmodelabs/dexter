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
    'eventemitter2',
    'modernizr'
], function(
    _, $,
    Backbone,
    Router,
    EventEmitter2
) {

    return {
        router: null,
        init: function() {

            /*
             * Start router.
             */

            this.router = Router;
            this.router.init();
        }
    }
});