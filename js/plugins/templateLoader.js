/**
 * Get the config of this application the required
 * views and pre load every template for them.
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'libs/debug',
    'configs/dexter.conf',
    'libs/unique',
    'viewLoader!',
    'shim!Object.keys'
], function(
    debug,
    dexterConf,
    unique,
    viewList
) {

    debug = debug('DX');

    var templateList;

    templateList = [];

    return {
        load: function(resourceId, require, load, config) {
            if (config.isBuild) { return load(); }

            var name, i;

            if (templateList.length) {
                load(templateList);
                return;
            }

            for (name in viewList) {
                if (viewList.hasOwnProperty(name)) {
                    templateList.push('text!templates/'+name+'.html');
                }
            }

            if (dexterConf.preLoad &&
                dexterConf.preLoad.templates) {
                for (i=dexterConf.preLoad.templates.length; i--;) {
                    templateList.push('text!templates/'+dexterConf.preLoad.templates[i]+'.html');
                }
            }

            debug.yellow('register templates:\n     '+templateList.join(',\n     '));
            require(templateList, function() {
                load(Array.prototype.slice.call(arguments, 0));
            });
        }
    }

});