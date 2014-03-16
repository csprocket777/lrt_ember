/**
 * Created by chshipma on 10/8/13.
 */
export default Ember.Component.extend({
    layoutName: "display-type-single-text-field-with-relations",
   actions:{
       addNew:function()
       {
           switch( this.get('providedModel.modelName') )
           {
               case "option":
                   this.get('providedModel.store').createRecord( this.get('providedModel.modelName'),{
                       optionType: this.get('providedModel'),
                       modelName: this.get('providedModel.modelName'),
                       active: true
                   });

                   Ember.run.next(this, function(){
                       $('tr.warning:last input:first').focus();
                   });
                   break;
           }
       }
   }
});