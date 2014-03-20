/**
 * Created by chshipma on 3/14/14.
 */
export default Ember.Component.extend({
    actions:{
        removeField: function(evt){
            this.sendAction("removeFieldAction", this.get('model'));
        },

        changeOrderUp: function(itemType){
            this.sendAction('changeOrderUpAction', this.get('model'), itemType);
        },

        changeOrderDown: function(itemType){
            this.sendAction('changeOrderDownAction', this.get('model'), itemType);
        }
    }
});