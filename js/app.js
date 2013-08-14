define([
    'underscore',
    'jquery',
    'backbone',
    'router',
    'modernizr',
    'epoxy'
], function(
    _, $,
    Backbone,
    Router
) {

    return {
        router: null,
        init: function() {
            this.router = Router;
            this.router.init();
        }
    }
});