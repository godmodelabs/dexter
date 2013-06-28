define([
    'models/article',
    'jquery',
    'underscore',
    'backbone',
    'chai'
], function(ArticleModel, $, _, Backbone, chai) {

    var should = chai.should(),
        article;

    beforeEach(function() {
        article = new ArticleModel();
    });

    describe('article', function() {
        it('should have a default title', function() {
            article.has('title').should.be.true;
        });
        it('should have a default content', function() {
            article.has('content').should.be.true;
        });
    });

});