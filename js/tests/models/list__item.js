define([
    'models/list__item',
    'jquery',
    'underscore',
    'backbone'
], function (
    ListItem,
    $, _,
    Backbone
) {

    describe('listItem', function() {
        var list = new ListItem();

        it('should return default title', function() {
            expect(list.title).toBe('default title');
        });
    });

});