define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXItem',
    'shim!Function.prototype.bind'
], function(
    debug,
    _, $,
    dXItem
) {

    /**
     * This view shows a single enemy. It listens to model data
     * changes and updates the position of this view.
     *
     * @class EnemyView
     * @author Tamas-Imre Lukacs
     */

    return dXItem.extend(/** @lends EnemyView.prototype */{
        dXName: 'enemy',

        /**
         * Update the current elements position on model
         * data change.
         */

        initialize: function() {
            dXItem.prototype.initialize.call(this);

            this.$el
                .css('left', this.model.get('sX'))
                .css('top', this.model.get('sY'))
                .css('width', this.model.get('width')-2)
                .css('height', this.model.get('height')-2);


            this.model.on('change:x', function(model, x) {
                this.$el.css('left', x);
            }.bind(this));

            this.model.on('change:y', function(model, y) {
                this.$el.css('top', y);
            }.bind(this));
        }
    });

});