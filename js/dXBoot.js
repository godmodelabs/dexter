/**
 * 
 * 
 * @author: Riplexus <riplexus@gmail.com>
 */

define([
    'dXRouter',
    'configs/dXRoutes.conf',
    'configs/dXViews.conf',
    'shim!console.log'
], function(
    dXRouter,
    routesConf,
    dexterConf
) {
    
    return function() {
        // Redirect #! to /
        if (window.location.hash.indexOf('!') > -1) {
            window.location = window.location.hash.substring(2);
            return;
        }

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
        this.dXRouter = dXRouter;
        this.dXRouter.init();
    };

});