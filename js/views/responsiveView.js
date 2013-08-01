define([
    'libs/debug',
    'jquery',
    'mustache',
    'views/dXResponsiveView',
    'collections/list',
], function(debug, $, Mustache, dXResponsiveView, List) {
    debug = debug('EXAMPLE');

    return dXResponsiveView.extend({

        dXName: 'responsiveView',
        dXSubViews: ['subView'],

        dXTemplateData: function() {
            return {
                list: this.list.models,
                name: this.dXName
            };
        },

        initialize: function() {
            var self = this;

            this.list = new List();

            // Insert dummy data
            this.list.add({ title: 'itseme mario' });
            this.list.add({ title: 'luigi..' });

            this.list.on('add', function() {
                self.dXUpdate();
            });
            this.list.on('change', function() {
                self.dXUpdate();
            });
        },

        enter: function() {},
        enterMobile: function() {},
        enterTablet: function() {},
        enterDesktop: function() {},

        leave: function() {}
    });

});