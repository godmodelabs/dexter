/**
 * Get every view registered as global or routed
 * and pre load the view objects.
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'libs/debug',
    'configs/routes.conf',
    'configs/dexter.conf',
    'libs/unique',
    'shim!Object.keys'
], function(
    debug,
    routesConf,
    dexterConf,
    unique
) {

    // Welcome message
    debug('~>')('Welcome to Dexter 0.3.2');

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
        load: function(resourceId, require, load, config) {
            if (config.isBuild) { return load(); }

            var path, viewList, ret, i;

            viewList = [];
            ret = {};

            for (path in routesConf) {
                if (routesConf.hasOwnProperty(path) &&
                    routesConf[path] !== '') {
                    viewList.push('views/'+routesConf[path]);
                }
            }

            if (dexterConf.preLoad &&
                dexterConf.preLoad.views) {
                for (i=dexterConf.preLoad.views.length; i--;) {
                    viewList.push('views/'+dexterConf.preLoad.views[i]);
                }
            }

            if (dexterConf.global) {
                for (i=dexterConf.global.length; i--;) {
                    viewList.push('views/'+dexterConf.global[i]);
                }
            }

            getViewList(require, viewList, ret, function(ret) {
                debug.yellow('registered views:\n     #'+Object.keys(ret).join(',\n     #'));
                load(ret);
            });
        }
    }
});