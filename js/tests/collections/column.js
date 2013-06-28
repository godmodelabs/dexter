define([
    'collections/column',
    'jquery',
    'underscore',
    'backbone',
    'chai'
], function(ColumnCollection, $, _, Backbone, chai) {

    var should = chai.should(),
        collection;

    describe('column', function() {

        it('should be instanced without error', function() {
            collection = new ColumnCollection();
        });

        it('should start with zero articles', function() {
            collection.should.have.length(0);
        });

        describe('article', function() {
            var article, poppedArticle;

            article = {
                author: 'itseme mario',
                title: 'maaaaar',
                content: 'rrrioooooo...'
            };

            it('should be added with author', function() {
                collection.add(article);
                collection.should.have.length(1);
            });
            it('should be retrieved by pop', function() {
                poppedArticle = collection.pop();
                collection.should.have.length(0);
            });
            it('should keep his author', function() {
                poppedArticle.has('author').should.be.true;
                poppedArticle.get('author').should.equal(article.author);
            });
            it('should keep his title', function() {
                poppedArticle.has('title').should.be.true;
                poppedArticle.get('title').should.equal(article.title);
            });
            it('should keep his content', function() {
                poppedArticle.has('content').should.be.true;
                poppedArticle.get('content').should.equal(article.content);
            });
        });
    });

});