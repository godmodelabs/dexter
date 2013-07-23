/**
 *
 */

define([
    'configs/routes.conf'
], function(routes) {

    return {
        load: function(resourceId, require, load) {
            var path, viewList, viewIds;

            viewList = [];
            viewIds = [];

            for (path in routes) {
                if (routes.hasOwnProperty(path) &&
                    routes[path] !== '') {
                    viewIds.push(routes[path]);
                    viewList.push('views/'+routes[path]);
                }
            }

            require(viewList, function() {
                var views, ret, i, l;

                views = Array.prototype.slice.call(arguments, 0);
                ret = {};

                for(i=0, l=views.length; i<l; i++) {
                    ret[viewIds[i]] = views[i];
                }

                load(ret);
            })

        }
    }

});