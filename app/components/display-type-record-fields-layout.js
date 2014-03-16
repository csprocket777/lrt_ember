/**
 * Created by chshipma on 10/8/13.
 */
export default Ember.Component.extend({
   layoutName: "display-type-record-fields-layout",
    fieldTypeOptions: function(){
        return this.get('parentView.parentView.controller.store').find('record-field-type');
    }.property(),

   actions:{
       addNew:function(evtData)
       {
           this.sendAction("newAction", evtData);
           Ember.run.next(this, function(){
               $('tr.warning:last input:first').focus();
               $.scrollTo( $('.newBtn:last') );
           });
       },


       cancelNew: function(evtData){
           this.sendAction("cancelAction", evtData);
       },

       relationshipSelectChanged:function(data)
       {
           data.modelToManage.set( data.propToTriggerAsDirty , Ember.compare( data.newValue, data.originalValue ) !== 0 );
       }
   }
});
