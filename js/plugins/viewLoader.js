/**
 *
 */

define([
    'libs/debug',
    'configs/routes.conf',
    'libs/unique',
    'shim!Object.keys'
], function(debug, routes, unique) {
    debug = debug('DX');

    function getViewList(require, list, ret, callback) {
        var views, i, j, view, subView, subViewList;

        subViewList = [];

        require(list, function() {
            views = Array.prototype.slice.call(arguments, 0);

            for (i=views.length; i--;) {
                view = views[i];

                if (!view.prototype.dXName) { continue; }

                if (subView = view.prototype.dXSubViews) {
                    for (j=subView.length; j--;) {
                        subViewList.push('views/'+subView[j]);
                    }
                }

                ret[view.prototype.dXName] = views[i];
            }

            subViewList = unique(subViewList);

            if (subViewList.length === 0) {
                callback(ret);
            } else {
                getViewList(require, subViewList, ret, callback);
            }

        });
    }

    return {
        load: function(resourceId, require, load) {
            var path, viewList, ret;

            viewList = [];
            ret = {};

            for (path in routes) {
                if (routes.hasOwnProperty(path) &&
                    routes[path] !== '') {
                    viewList.push('views/'+routes[path]);
                }
            }

            debug('get view list');
            getViewList(require, viewList, ret, function(ret) {
                debug('got view list:\n#'+Object.keys(ret).join(', \n#'));
                load(ret);
            });
        }
    }

});