/**
 * @source: http://jquery-howto.blogspot.de/2009/09/get-url-parameters-values-with-jquery.html
 */

define(['jquery'], function() {
    $.extend({

        getUrlVars: function(){
            var vars = [], hash, hashes, i;

            hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }

            return vars;
        },

        getUrlVar: function(name){
            return $.getUrlVars()[name];
        }
    });
});