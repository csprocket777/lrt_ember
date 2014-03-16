/**
 * Created by chshipma on 11/22/13.
 */
export default Ember.View.extend({
    didInsertElement:function(){
        if( this.get('controller.model.isNew') )
        {
            this.$().find("#cecid").focus();
        }
    }
});