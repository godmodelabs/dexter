/**
 * The router manages the loading of global and routed
 * views and the behaviour on route change. We use the
 * Backbone.Router to simplify the routing.
 *
 * @class Router
 * @author: Riplexus <riplexus@gmail.com>
 */

define([
    'libs/debug',
    'underscore',
    'jquery',
    'backbone',
    'modernizr',
    'configs/dXRoutes.conf',
    'configs/dXViews.conf',
    'dXViewLoader!',
    'dXTemplateLoader!',
    'libs/pipe',
    'libs/flip',
    'libs/removeClasses',
    'shim!Object.keys'
], function(
    debug,
    _, $,
    Backbone,
    Modernizr,
    routesConf,
    dexterConf,
    viewList,
    templateList,
    pipe,
    flip,
    removeClasses
) {

    debug = debug('DX');

    var AppRouter = Backbone.Router.extend({
        routes: routesConf
    });

    // Todo extend Backbone.Router directly?

    return /** @lends Router.prototype */{

        /**
         * Stores the Backbone.Router object.
         */

        obj: null,

        /**
         * Stores the current, route-linked view.
         */

        currentView: {},

        /**
         * Stores the routed views, if loaded.
         */

        viewCache: {},

        /**
         * An object with every view prototype.
         */

        viewList: viewList,

        /**
         * Maps the view names to routes.
         */
        
        viewRoutes: flip(routesConf),

        /**
         * Cached route classes, will be added to the body.
         */
        
        routeClasses: {},

        /**
         * The current routing parameters.
         */

        parameters: null,

        /**
         * The main behaviour of the router is described here.
         * Load the global views first, register the routed views
         * afterwards and manage the behaviour on route change.
         */

        init: function() {
            var i, view, viewName,
                that = this;

            this.obj = new AppRouter();

            /*
             * Load global, navigation independent views.
             */

            for (i=dexterConf.global.length; i--;) {
                viewName = dexterConf.global[i];

                if (viewName in this.viewList) {
                    // TODO test!
                    view = [];
                    $('body').find('[data-dX='+viewName+']').each(function(index) {
                        var $this = $(this);
                        $this.attr('data-dX', viewName+'-'+index);

                        view = new (that.viewList[viewName].extend({
                            dXRouter: that,
                            dXIndex: index
                        }))();
                    });

                    this.viewCache[viewName] = view;
                }
            }

            /*
             * Match the route to his corresponding view and
             * render it dynamically.
             */

            for (viewName in this.viewList) {
                if (!this.viewList.hasOwnProperty(viewName)) { continue; }

                (function(viewName) {

                    /*
                     * Manage route changes.
                     */

                    this.obj.on('route:'+viewName, function() {
                        var path, $body,
                            that = this;

                        /*
                         * Store the route parameters in <dXRouter.parameters> for the
                         * views.
                         */

                        this.parameters = Array.prototype.slice.call(arguments);
                        this.path = Backbone.history.fragment;

                        debug.lightblue('navigate to /'+this.path);

                        /*
                         * Create a list of route classes for the current view, will
                         * be assigned to the body for any route specific css code.
                         */
                        
                        if (!(viewName in this.routeClasses)) {
                            path = this.viewRoutes[viewName][0];
                            this.routeClasses[viewName] = [];
                            
                            path = path.replace(/(\*path|:)/g, '').split('/');
                            while(path.length) {
                                this.routeClasses[viewName]
                                    .push('route-'+(path.join('-') || 'index'));
                                path.pop();
                            }
                        }
                        $body = $('body');
                        removeClasses($body[0], 'route-');
                        $body.addClass(this.routeClasses[viewName].join(' '));

                        /*
                         * Leave current view.
                         */

                        _.each(this.currentView, function(view) {
                            if ('dXLeave' in view) {
                                view.dXLeave();
                            }
                        });

                        /*
                         * Get or create the desired view instance and render
                         * it with his subviews with <dXEnter>. If the view is
                         * not yet cached, the initialization will call <dXEnter>.
                         */

                        if (!(viewName in this.viewCache)) {
                            view = [];
                            $body.find('[data-dX='+viewName+']').each(function(index) {
                                var $this = $(this);
                                $this.attr('data-dX', viewName+'-'+index);

                                view.push(new (that.viewList[viewName].extend({
                                    dXRouter: that,
                                    dXIndex: index
                                }))());
                            });
                            that.viewCache[viewName] = view;

                        } else {
                            view = this.viewCache[viewName];
                            _.each(view, function(item) {
                                if ('dXEnter' in item) {
                                    item.dXEnter();
                                }
                            });
                        }

                        // Reference current router-enabled view
                        this.currentView = view;
                    }.bind(this));

                }.bind(this))(viewName);
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
                    this.obj.navigate(url, { trigger: true });
                }
            }.bind(this));
            
            /*
             * Router events.
             */
            
            pipe.on('dXRouter/goTo', this.goTo.bind(this));
        },

        /**
         * Convenience navigation method.
         *
         * @param {string} path
         */

        goTo: function(path) {
            this.obj.navigate(path, {trigger: true});
        }
    };

});