define([
    'dX/StaticView'
], function(
    dXStaticView
) {

    /**
     * Example of a basic static view.
     * It does not have to be in a subfolder, but if any view is,
     * you must prefix its dXName with the folder name.
     *
     * @class Static
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXStaticView.extend(/** @lends Static.prototype */{
        dXName: 'static__Navigation',

        initialize: function() {
            dXStaticView.prototype.initialize.call(this);

            // listen to navigation change to highlight current path
            this.dXPipe.on('navigation', function(path) {
                this.$el.find('a').css('font-weight', 'normal');
                this.$el.find('[href="/'+path+'"]').css('font-weight', 'bold');
                // current path also available in this.dXRouter.path
            });
        }
    });
});