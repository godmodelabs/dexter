/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 *
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 * @source http://stackoverflow.com/a/171256/795605
 * @ignore
 */

define(function() {
    return function override(obj1,obj2){
        var obj3 = {}, attr;
        for (attr in obj1) {
            if (obj1.hasOwnProperty(attr)) {
                obj3[attr] = obj1[attr];
            }
        }
        for (attr in obj2) {
            if (obj2.hasOwnProperty(attr)) {
                obj3[attr] = obj2[attr];
            }
        }
        return obj3;
    };
});