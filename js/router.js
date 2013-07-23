/**
 *
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'configs/routes.conf',
    'viewLoader!',
    'libs/applyMaybe'
], function($, _, Backbone, routes, viewList, applyMaybe) {

    var AppRouter = Backbone.Router.extend({
        routes: routes
    });

    return {
        obj: null,
        currentView: null,
        init: function() {
            var v, viewRoute, self, defaultView, viewCache;

            self = this;
            self.obj = new AppRouter;
            viewCache = {};

            if (routes['*path'] !== '') {
                defaultView = new viewList[routes['*path']]();
                viewCache[routes['*path']] = defaultView;
            }

            /*
             * Match the route to his corresponding view and
             * render it dynamically. The <defaultView.render> function
             * will be called on every route change.
             */
            for (viewRoute in viewList) {
                if (viewList.hasOwnProperty(viewRoute)) {
                    (function(route, viewRoute) {
                        self.obj.on('route:'+route, function() {
                            if (self.currentView !== null) {
                                applyMaybe(self.currentView, 'leave');
                            }

                            if (!(viewRoute in viewCache)) {
                                v = new viewList[viewRoute]();
                                viewCache[viewRoute] = v;
                            } else {
                                v = viewCache[viewRoute];
                            }

                            if (defaultView && defaultView !== v) {
                                defaultView.render();
                            }
                            self.currentView = v;
                            v.render();
                        });
                    })(viewRoute, viewRoute);
                }
            }

            /*
             * Start backbone navigation.
             */
            if (Modernizr.history) {
                Backbone.history.start({ pushState: true });
            } else {
                Backbone.history.start();
            }

            /*
             * Prevent page reload on link click.
             */
            $(document).on('click', 'a[href^="/"]', function(event) {
                var href, url;

                href = $(event.currentTarget).attr('href');
                if (!event.altKey && !event.ctrlKey &&
                    !event.metaKey && !event.shiftKey) {

                    event.preventDefault();
                    url = href.replace(/^\//,'').replace(/#!/, '');
                    self.obj.navigate(url, { trigger: true });
                }
            });
        }
    };

});