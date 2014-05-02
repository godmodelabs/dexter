define(function() {

    /**
     * 
     * 
     * @param {object} obj
     * @returns {object}
     */

    function flip(obj){
        var key, result = {};
        
        for (key in obj) {
            if (!obj.hasOwnProperty(key)) { continue; }
            if (!(obj[key] in result)) { result[obj[key]] = []; }
            result[obj[key]].push(key);
        }
        
        return result;
    }
    
    return flip;
});