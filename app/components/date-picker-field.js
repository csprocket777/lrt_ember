/**
 * Created by chshipma on 3/13/14.
 */
export default Ember.Component.extend({
    dataFormat: 'yyyy-mm-dd',

    didInsertElement: function(evt){
        var params = {
            format: this.get('dataFormat')
        };

        var attr = {
            "data-date-format": this.get('dataFormat')
        };

        if( this.get('component') )
        {
            $("#" + this.get('elementId') + ' .date').attr(attr).datepicker(params);
        }else{
            $("#" + this.get('elementId') + ' input').attr(attr).datepicker(params);
        }
    }
});