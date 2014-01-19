define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXItem'
], function(
    debug,
    _, $,
    dXItem
) {

    debug = debug('EXAMPLE');

    return dXItem.extend({
        dXName: 'list__item',

        dXTemplateData: function() {
            return this.model? {
                title: this.model.get('title')
            } : '';
        }

    });

});