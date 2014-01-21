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
        dXName: 'enemy',

        initialize: function() {
            dXItem.prototype.initialize.call(this);

            var that = this;

            that.$el
                .css('left', this.model.get('sX'))
                .css('top', this.model.get('sY'))
                .css('width', this.model.get('width')-2)
                .css('height', this.model.get('height')-2);


            this.model.on('change:x', function(model, x) {
                that.$el.css('left', x);
            });

            this.model.on('change:y', function(model, y) {
                that.$el.css('top', y);
            });
        }
    });

});