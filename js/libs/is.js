/**
 *
 *
 * @source http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/
 */

define(function() {

    var is = {
        android: function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        blackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        windowsPhone: function() {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        mobile: function() {
            return (is.android() || is.blackBerry() || is.iOS() || is.windowsPhone());
        },
        desktop: function() {
            return !is.mobile();
        }
    };

    return is;
});