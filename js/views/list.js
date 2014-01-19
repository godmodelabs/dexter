define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView',
    'collections/list'
], function(
    debug,
    _, $,
    dXResponsiveView,
    List
) {

    debug = debug('EXAMPLE');

    return dXResponsiveView.extend({

        dXName: 'list',
        dXSubViews: ['list__header', 'points'],

        events: {
            'click .add': 'onAdd',
            'click .pop': 'onPop',
            'click .shift': 'onShift'
        },

        bindings: {
            'ul': 'collection:$collection'
        },

        initialize: function() {
            dXResponsiveView.prototype.initialize.call(this);

            this.collection = new List();

            // Insert dummy data
            this.collection.add({ title: 'itseme mario' });
            this.collection.add({ title: 'and luigi..' });
        },

        onAdd: function() {
            var input = this.$el.find('input').val();
            this.collection.add({title: input});
        },

        onPop: function() {
            this.collection.pop();
        },

        onShift: function() {
            this.collection.shift();
        }
    });

});