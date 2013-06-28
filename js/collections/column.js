define([
    'underscore',
    'backbone',
    'models/article'
], function(_, Backbone, ArticleModel) {

    return Backbone.Collection.extend({
        model: ArticleModel
    });

});