define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'modernizr'
], function($, _, Backbone, Router) {

    return {
        router: null,
        init: function() {
            this.router = Router;
            this.router.init();
        }
    }
});