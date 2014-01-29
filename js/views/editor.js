define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView',
    'shim!Function.prototype.bind'
], function(
    debug,
    _, $,
    dXResponsiveView
) {

    /**
     *
     * @class EditorView
     * @author Tamas-Imre Lukacs
     */

    return dXResponsiveView.extend(/** @lends EditorView.prototype */{
        dXName: 'editor'

    });

});