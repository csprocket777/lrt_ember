/**
 * Created by chshipma on 10/7/13.
 */
export default Ember.Component.extend({
   layoutName: "display-type-feature-option-fields",
   statusOptions: function(){
       return this.get('parentView.parentView.controller.store').findQuery('option', {optionType: this.get('model.optionSubGroup.id') });
   }.property(),

    actions:{
        relationshipSelectChanged:function(data)
        {
            data.modelToManage.set( data.propToTriggerAsDirty , data.newValue !== data.originalValue);
        },
        addNew:function(evtData){
            this.sendAction("newAction", evtData);
            Ember.run.next(this, function(){
                $('tr.warning:last input:first').focus();
            });
        },

        cancelNew: function(evtData){
            this.sendAction("cancelAction", evtData);
        }
    }
});