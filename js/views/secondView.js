define([
    'libs/debug',
    'jquery',
    'mustache',
    'views/dXView'
], function(debug, $, Mustache, dXView) {
    debug = debug('EXAMPLE');

    return dXView.extend({

        dXName: 'secondView',

        dXTemplateData: function() {
            return {
                name: this.dXName
            };
        },

        initialize: function() {},

        enter: function() {},

        leave: function() {}
    });

});