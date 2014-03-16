/**
 * Created by chshipma on 3/14/14.
 */
export default Ember.Component.extend({
    actions:{
        removeField: function(evt){
            this.sendAction("removeFieldAction", this.get('model'));
        }
    }
});