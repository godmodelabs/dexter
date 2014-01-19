define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXView'
], function(
    debug,
    _, $,
    dXView
) {

    debug = debug('EXAMPLE');

    return dXView.extend({
        dXName: 'list__header__sub'
    });

});