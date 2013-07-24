/**
 *
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'configs/routes.conf',
    'viewLoader!',
    'libs/applyMaybe',
    'libs/intersect',
    'shim!Object.keys'
], function($, _, Backbone, routes, viewList, applyMaybe, intersect) {

    console.log(viewList);

    var AppRouter = Backbone.Router.extend({
        routes: routes
    });

    return {

        /**
         * Stores the Backbone.Router object.
         */
        obj: null,

        /**
         * Stores the current, route-linked view.
         */
        currentView: null,

        /**
         *
         */
        init: function() {
            var view, viewRoute, self, defaultView, viewCache;

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
                                self.cacheSubViews(self.currentView, viewCache);
                                applyMaybe(self.currentView, 'leave');
                            }

                            if (!(viewRoute in viewCache)) {
                                view = new viewList[viewRoute]();
                                viewCache[viewRoute] = view;
                            } else {
                                view = viewCache[viewRoute];
                            }

                            /*
                             * Update default view.
                             */

                            if (defaultView && defaultView !== view) {
                                defaultView.render();
                            }

                            /*
                             * Render desired view with his subviews afterwards.
                             */

                            view.render(function() {
                                self.loadSubViews(view, self.currentView, viewCache, viewList, function() {
                                    self.currentView = view;
                                    applyMaybe(view, 'enter');
                                });
                            });
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
        },

        /**
         *
         * @param view
         * @param viewCache
         */
        cacheSubViews: function(view, viewCache) {
            var i, subView;

            for (i=view.subViews.length; i--;) {
                subView = viewCache[view.subViews[i]];

                if (!subView) { continue; }

                subView.$cachedEl = subView.$el.html();
            }

        },

        /**
         *
         * @param view
         * @param lastView
         * @param viewCache
         * @param viewObjectList
         * @param callback
         */
        loadSubViews: function(view, lastView, viewCache, viewObjectList, callback) {
            var i, subView, lastSubViews, subViews, keys,
                intersection, remainingViews, leavingViews, enteringViews;

            lastSubViews = {};
            subViews = {};

            function getSubViews(viewList, list) {
                var remaining = [];

                for (i=viewList.length; i--;) {
                    subView = viewCache[viewList[i]];
                    if (!subView) {
                        subView = new viewObjectList[viewList[i]]();
                        viewCache[viewList[i]] = subView;
                    }

                    list[viewList[i]] = subView;
                    remaining = remaining.concat(subView.subViews);
                }

                if (remaining.length > 0) {
                    getSubViews(remaining, list);
                }
            }

            if (lastView) {
                getSubViews(lastView.subViews, lastSubViews);
            }
            getSubViews(view.subViews, subViews);

            /*
             * Figure out, which subview is new, will be obsolete or remains in the application.
             */

            intersection = intersect(lastSubViews, subViews);

            remainingViews = intersection[0];
            leavingViews = intersection[1];
            enteringViews = intersection[2];

            /*
             * Move html from remaining subviews to new container.
             */

            for (i in remainingViews) {
                if (remainingViews.hasOwnProperty(i)) {
                    remainingViews[i].$el = $('#'+remainingViews[i].name);
                    remainingViews[i].$el.html(remainingViews[i].$cachedEl);

                }
            }

            /*
             * Trigger leave function.
             */

            for (i in leavingViews) {
                if (leavingViews.hasOwnProperty(i)) {
                    applyMaybe(leavingViews[i], 'leave');
                }
            }

            /*
             * Render new subviews. This has to be synchronous, because of the possible dependency
             * on DOM nodes. Trigger enter function afterwards.
             */

            if (Object.keys(enteringViews).length === 0) {
                callback();

            } else {
                renderViewsSync(jQuery.extend({}, enteringViews), function() {
                    keys = Object.keys(enteringViews);

                    for (i=keys.length; i--;) {
                        applyMaybe(enteringViews[keys[i]], 'enter');
                    }

                    callback();
                });
            }

            function renderViewsSync(views, callback) {
                var view, keys;

                keys = Object.keys(views);

                if (keys.length === 0) {
                    callback();
                    return;
                }

                view = views[keys[0]];

                view.$el = $('#'+view.name);
                view.render(function() {
                    delete views[keys[0]];
                    renderViewsSync(views, callback);
                });
            }
        }
    };

});