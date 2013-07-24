/**
 *
 */

define([
    'configs/routes.conf',
    'libs/unique'
], function(routes, unique) {

    function getViewList(require, list, ret, callback) {
        var views, i, j, v, sv, subViewList;

        subViewList = [];

        require(list, function() {
            views = Array.prototype.slice.call(arguments, 0);

            for (i=views.length; i--;) {
                v = new views[i]();

                if (!v.name) { continue; }

                if (sv = v.subViews) {
                    for (j=sv.length; j--;) {
                        subViewList.push('views/'+sv[j]);
                    }
                }

                ret[v.name] = views[i];
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

            getViewList(require, viewList, ret, load);
        }
    }

});