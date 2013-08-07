/**
 *
 */

define([
    'libs/debug',
    'jquery',
    'backbone',
    'configs/routes.conf',
    'viewLoader!',
    'libs/applyMaybe',
    'libs/intersect',
    'libs/debugBar',
    'libs/getUrlVars',
    'shim!Object.keys'
], function(debug, $, Backbone, routes, viewList, applyMaybe, intersect, debugBar) {
    debug = debug('DX');

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

        viewCache: {},

        viewList: null,

        parameters: null,

        /**
         *
         */
        init: function() {
            var view, viewName, self;

            self = this;
            self.obj = new AppRouter;
            self.viewList = viewList;

            /*
             * Match the route to his corresponding view and
             * render it dynamically.
             */

            for (viewName in self.viewList) {
                if (self.viewList.hasOwnProperty(viewName)) {
                    (function(viewName) {

                        /*
                         * Manage route changes.
                         */

                        self.obj.on('route:'+viewName, function() {

                            /*
                             * Store the route parameters in <router.parameters> for the
                             * views. The <isRouting> flag will be used to clear and leave
                             * the currentView after initializing the new view with his
                             * template in <dXUpdate>.
                             */

                            self.isRouting = true;
                            self.parameters = Array.prototype.slice.call(arguments);
                            self.path = Backbone.history.fragment;

                            debug.colored('navigate to /'+self.path+' \n    #'+viewName+' ['+self.parameters+']', '#7dd');

                            /*
                             * Get or create the desired view instance and render
                             * it with his subviews.
                             */

                            if (!(viewName in self.viewCache)) {
                                self.viewList[viewName].prototype.router = self;
                                view = new self.viewList[viewName]();
                                self.viewCache[viewName] = view;

                            } else {
                                view = self.viewCache[viewName];
                            }

                            view.render.call(view, function routerRender() {
                                self.currentView = view;
                            });
                        });

                    })(viewName);
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

            /*
             * Debugging tool
             */

            if ($.getUrlVar('debug')) {
                debugBar(self.viewCache);
            }
        },

        /**
         * todo: move to view prototype
         *
         * @param viewList
         * @param list
         */
        getSubViewList: function(viewList, list) {
            var i, subView;

            for (i=viewList.length; i--;) {
                subView = this.viewCache[viewList[i]];
                if (!subView) {
                    this.viewList[viewList[i]].prototype.router = this;
                    subView = new this.viewList[viewList[i]]();
                    subView.router = this;
                    this.viewCache[viewList[i]] = subView;
                }

                list[viewList[i]] = subView;
            }
        },

        /**
         *
         * @param view
         * @param [callback]
         */
        loadSubViews: function(view, callback) {
            debug.colored('load subviews of #'+view.dXName+' via router', '#9394cc');

            var i, lastSubViews, subViews, remainingView,
                intersection, remainingViews, leavingViews, enteringViews;

            lastSubViews = {};
            subViews = {};
            callback = callback || function() {};

            if (this.currentView) {
                this.getSubViewList(this.currentView.dXSubViews, lastSubViews);
            }
            this.getSubViewList(view.dXSubViews, subViews);

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

            if (Object.keys(remainingViews).length > 0) {
                debug.colored('remaining subviews: '+Object.keys(remainingViews), '#9394cc');
            }

            for (i in remainingViews) {
                if (remainingViews.hasOwnProperty(i)) {
                    remainingView = remainingViews[i];

                    remainingView.$el = $('[data-dXId='+remainingView.dXName+']');

                    debug.colored('get cached subview #'+remainingView.dXName, 'lightgray');
                    remainingView.$el.append(remainingView.$cachedEl);

                }
            }

            /*
             * Trigger leave function.
             */

            if (Object.keys(leavingViews).length > 0) {
                debug.colored('leaving subviews: '+Object.keys(leavingViews), '#9394cc');
            }

            for (i in leavingViews) {
                if (leavingViews.hasOwnProperty(i)) {
                    applyMaybe(leavingViews[i], 'leave');
                    leavingViews[i].dXIsActive = false;
                }
            }

            /*
             * Render new subviews. This has to be synchronous, because of the possible dependency
             * on DOM nodes. Trigger enter function afterwards.
             */

            if (Object.keys(enteringViews).length === 0) {
                callback();

            } else {
                debug.colored('new subviews: '+Object.keys(enteringViews), '#9394cc');
                this.renderViewsSync(jQuery.extend({}, enteringViews), callback);
            }
        },

        /**
         *
         * @param views
         * @param callback
         */
        renderViewsSync: function renderViewsSync(views, callback) {
            var view, keys, self;

            keys = Object.keys(views);
            self = this;

            if (keys.length === 0) {
                callback();
                return;
            }

            view = views[keys[0]];

            view.$el = $('[data-dXId='+view.dXName+']');

            view.render.call(view, function subViewRendered() {
                delete views[keys[0]];
                self.renderViewsSync(views, callback);
            });
        }
    };

});