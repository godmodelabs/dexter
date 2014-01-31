define(function() {

    /**
     * Strip html from an input string.
     *
     * @param {string} str
     * @returns {string}
     * @source: http://stackoverflow.com/questions/822452/strip-html-from-text-javascript
     */

    return function strip(str) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = str;
        return tmp.textContent || tmp.innerText || "";
    };
});