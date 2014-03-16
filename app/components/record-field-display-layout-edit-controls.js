/**
 * Created by chshipma on 3/14/14.
 */
export default Ember.Component.extend({
    classNames: ['record-field-display-layout-edit-controls-container'],

    actions:{
        removeField: function(evt){
            this.sendAction("removeFieldAction", evt);
        }
    }
});