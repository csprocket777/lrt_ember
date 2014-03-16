import Resolver from 'ember/resolver';

import optionDisplayTypeHelper from "appkit/views/option-display-type";
import recordFieldDisplayTypeHelper from "appkit/views/record-field-display-type";
import trigger from "appkit/helpers/trigger-event";

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});

// Quick hack to get rid of ios address bar.
//function hideAddressBar()
//{
//    if (!window.location.hash) {
//        if (document.height < window.outerHeight) {
//            document.body.style.height = (window.outerHeight + 50) + 'px';
//        }
//        setTimeout( function(){ window.scrollTo(0, 1); }, 50);
//    }
//}
//
//window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
//window.addEventListener("orientationchange", hideAddressBar );


//Ember.onerror = function(error){
//    console.log( error );
//    Em.$.ajax( "http://lsrtember/systemErrors", {
//        type:'POST',
//        contentType: "application/json; charset=UTF-8",
//        dataType: 'json',
//        data: JSON.stringify({
//            systemError: {
//                stack: error.stack,
//                description: error.description,
//                message: error.message,
//                name: error.name,
//                fileName: error.fileName,
//                lineNumber: error.lineNumber,
//                number: error.number
//            }
//        })
//    });
//    throw new Ember.Error("Assertion Failed: " + error.stack);
//};


Ember.Handlebars.helper('option-display-type', optionDisplayTypeHelper);
Ember.Handlebars.helper('record-field-display-type', recordFieldDisplayTypeHelper);
Ember.Handlebars.registerHelper('trigger-event', trigger);

DS.DebugAdapter.reopen({
    getModelTypes: function() {
        var self = this;
        return Ember.keys(requirejs._eak_seen).filter(function(key) {
            return !!key.match(/^appkit\/models\//) && self.detect(require(key).default);
        }).map(function(key){
                var type = require(key).default, typeKey = key.match(/^appkit\/models\/(.*)/)[1];
                type.toString = function() { return typeKey; };
                return type;
            });
    }
});


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

export default App;