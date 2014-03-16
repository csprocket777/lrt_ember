/**
 * Created by chshipma on 10/8/13.
 */
export default Ember.Component.extend({
   layoutName: "display-type-single-text-field",

   newObject: null,

   newRecordObserver: function(){
       var unsavedRecords = this.get('optionsController.unsavedRecords');
       this.get('subGroupModel.childOptions').filterBy('isNew', true).forEach( function(item, index, enumerable){
               unsavedRecords.addObject(item);
       });
   }.observes('subGroupModel.childOptions.@each.isNew'),

   actions:{
       addNew:function(evtData)
       {
           switch( this.get('subGroupModel.modelName') )
           {
               case "option":
                   this.sendAction("newAction", evtData);

                   Ember.run.next(this, function(){
                       $('tr.warning:last input:first').focus();
                   });
                   break;
           }
       },

       cancelNew: function(evtData){
           this.sendAction("cancelAction", evtData);
       }
   }
});
