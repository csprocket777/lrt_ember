/**
 * Created by chshipma on 10/4/13.
 */
// THIS IS A CUSTOM DS MODEL ATTRIBUTE TYPE FUNCTION
var bool = {
    serialize: function(bool){
        return bool ? "true":"false";
    },

    deserialize: function(string){
        return string === "true";
    }
};

Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
    {
        return false;
    }

    // compare lengths - can save a lot of time
    if (this.length !== array.length)
    {
        return false;
    }

    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
            {
                return false;
            }
        }
        else if (this[i].toString() !== array[i].toString()) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

Array.prototype.compareEmber = function (array) {
    // if the other array is a falsy value, return
    if (!array)
    {
        return false;
    }

    // compare lengths - can save a lot of time
    if (this.length !== array.length)
    {
        return false;
    }

    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compareEmber(array[i]))
            {
                return false;
            }
        }
        else if ( array.contains( this[i] ) === false ){// this[i].toString() !== array[i].toString() ) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

Array.prototype.arrayColumn = function (colKey) {
    // if the other array is a falsy value, return
    if (!colKey)
    {
        return false;
    }

    var ret = [];

    for (var i = 0; i < this.length; i++) {
        if( ret.indexOf(this[i][colKey]) < 0 )
        {
            ret.push( this[i][colKey] );
        }
    }

    ret.sort();
    return ret;
};