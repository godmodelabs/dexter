define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView'
], function(
    debug,
    _, $,
    dXResponsiveView
) {

    debug = debug('EXAMPLE');

    return dXResponsiveView.extend({

        dXName: 'list__header',

        dXSubViews: ['list__header__sub'],

        dXTemplateData: {
            'title': 'Header'
        }
    });

});