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
    'configs/routes.conf',
    'configs/dexter.conf',
    'modernizr'
], function(
    _, $,
    Backbone,
    Router,
    debug,
    dXView,
    EventEmitter2,
    Mustache,
    routesConf,
    dexterConf
) {

    return {
        dXRouter: null,
        init: function() {

            // Set template renderer
            dXView.prototype.dXTemplateRenderer = function(template, data) {
                return Mustache.render(template, data);
            };

            // Remove system prefixes from config files.
            // The view and template loaders already handled system
            // specific loading.
            _.each([
                routesConf,
                dexterConf.global
            ], function(list) {
                _.each(list, function(route, i) {
                    if (_.isArray(route)) {
                        var split = route[0].split('!');
                        list[i] = split.length > 1? split[1]:split[0];
                    } else if (route.search('!') >= 0) {
                        list[i] = route.split('!')[1];
                    }
                });
            });

            // Start router.
            this.dXRouter = Router;
            this.dXRouter.init();
        }
    };
});