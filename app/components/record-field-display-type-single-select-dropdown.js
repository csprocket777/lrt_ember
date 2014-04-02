/**
 * Created by chshipma on 3/14/14.
 */

import recordFieldDisplayTypeBase from "appkit/components/record-field-display-type-base";

export default recordFieldDisplayTypeBase.extend({
    selectedValue: function(key, value){
        if( value ){
            this.get('relatedValues').removeObject( this.get('relatedValues').objectAt(0) );
            this.get('relatedValues').pushObject(value);
        }
        return this.get('fieldValue.firstObject');
    }.property('fieldValue.firstObject')
});