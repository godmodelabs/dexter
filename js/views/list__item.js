define([
    'libs/debug',
    'underscore',
    'jquery',
    'mustache',
    'views/dXItem'
], function(
    debug,
    _, $,
    Mustache,
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