/**
 * Created by chshipma on 10/8/13.
 */
export default Ember.Component.extend({
   layoutName: "display-type-record-field-types-layout",

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
       }
   }
});
