/**
 * Created by chshipma on 3/14/14.
 */
export default Ember.Component.extend({
    classNames: ['record-field-display-layout-edit-controls-container'],

    actions:{
        removeField: function(evt){
            this.sendAction("removeFieldAction", evt);
        },

        changeOrderUp: function(evt, itemType){
            this.sendAction('changeOrderUpAction', evt, itemType);
        },

        changeOrderDown: function(evt, itemType){
            this.sendAction('changeOrderDownAction', evt, itemType);
        }
    }
});