/**
 * Created by chshipma on 3/13/14.
 */
export default Ember.Component.extend({
    dataFormat: 'yyyy/mm/dd',

    didInsertElement: function(evt){
        var params = {
            format: this.get('dataFormat')
        };

        if( this.get('component') )
        {
            $("#" + this.get('elementId') + ' .date').datepicker(params);
        }else{
            $("#" + this.get('elementId') + ' input').datepicker(params);
        }
    }
});